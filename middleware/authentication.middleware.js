require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');


module.exports = {
    authentication: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (token) {
                jwt.verify(token, process.env.secret_key, async (err, decode) => {
                    if (decode) {
                        user = decode.userID
                        const userDetails = await UserModel.find({ _id: user })
                        role = userDetails[0].role
                        next()
                    }
                    else {
                        res.status(401).json({
                            status: false,
                            msg: 'error in the token.'
                        })
                    }
                })
            } else {
                res.status(401).json({
                    status: false,
                    msg: 'No Token Found!'
                })
            }
        }
        catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Authorization.'
            })
        }
    },

    authorization: (permittedRole) => {
        return (req, res, next) => {
            if (permittedRole.includes(role)) {
                next();
            } else {
                res.status(404).json({ 
                    'msg': 'not authorized' 
                })
            }
        }
    }
}