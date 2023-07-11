require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");


// All the userRoute functions are written here ------

module.exports = {
    userRegistration: async (req, res) => {
        try {
            const { firstName, lastName, email, password, role, securityQuestion, securityAnswer } = req.body;
            const user = await UserModel.find({ email });
            if (user.length >= 1) {
                return res.status(409).json({
                    status: false,
                    msg: 'Email-id already registered.'
                });
            } else {
                bcrypt.hash(password, 6, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            msg: 'Error occurred in hashing the password.'
                        });
                    } else {
                        try {
                            const answerHash = bcrypt.hashSync(securityAnswer, 6);
                            const newUser = new UserModel({ firstName, lastName, email, password: hash, role, securityQuestion, securityAnswer: answerHash });
                            await newUser.save();
                            return res.status(200).json({
                                status: true,
                                msg: 'Registered Successfully'
                            });
                        } catch {
                            return res.status(500).json({
                                status: false,
                                msg: 'Internal Server Error while saving the user'
                            });
                        }
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: 'Internal Server Error while registration'
            });
        }
    },

    userLogin: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.find({ email });
        if (user.length == 1) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.secret_key, { expiresIn: '7d' });
                    res.status(200).json({
                        status: true,
                        token: token,
                        msg: 'Login Successful',
                        data: user
                    })
                } else {
                    res.status(403).json({
                        status: false,
                        msg: 'Wrong Credentials'
                    })
                }
            })
        } else {
            res.status(404).json({
                status: false,
                msg: 'User not found!'
            })
        }
    },

    resetPassword: async (req, res) => {
        const { email, securityAnswer, newPassword } = req.body;
        const user = await UserModel.find({ email });
        if (user.length == 1) {
            bcrypt.compare(securityAnswer, user[0].securityAnswer, async (err, result) => {
                if (result) {
                    const password = bcrypt.hashSync(newPassword, 6);
                    await UserModel.updateOne({ _id: user[0]._id }, { $set: { password: password } });
                    res.status(200).json({
                        status: true,
                        msg: "Password Changed Successfully"
                    })
                } else {
                    res.status(403).json({
                        status: false,
                        msg: 'Security answer is wrong!'
                    })
                }
            })
        } else {
            res.status(404).json({
                status: false,
                msg: 'User not found!'
            })
        }
    }

}