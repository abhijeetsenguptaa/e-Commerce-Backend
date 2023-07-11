require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");
const { body, validationResult } = require('express-validator');

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
                await body('email').isEmail().normalizeEmail().run(req);
                await body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).run(req);
                const errors = validationResult(req);

                // Checking  for validation errors
                if (!errors.isEmpty()) {
                    return res.status(400).send({
                        status: false,
                        msg: 'Invalid email or password format'
                    });
                }
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
        try {
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
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error while Logging In.'
            })
        }
    },

    resetPassword: async (req, res) => {
        try {
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
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error while resetting password.'
            })
        }
    },

    userList: async (req, res) => {
        try {
            const role = req.query.role;
            const id = req.query.id;
            if (id) {
                const userDetails = await UserModel.find({ _id: id });
                res.status(200).json({
                    status: true,
                    data: userDetails
                })
            } else if (role) {
                const userDetails = await UserModel.find({ role });
                res.status(200).json({
                    status: true,
                    data: userDetails
                })
            } else {
                const userDetails = await UserModel.find({});
                res.status(200).json({
                    status: true,
                    data: userDetails
                })
            }
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in fetching the users.'
            })
        }
    },

    updatingUser: async (req, res) => {
        try {
            const id = req.query.id;
            const data = req.body;
            await UserModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: true,
                msg: 'Details updated Successfully',
                data: await UserModel.find({ _id: id })
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred While Updating!!'
            })
        }
    },

    deletingUser: async (req, res) => {
        try {
            const id = req.query.id;
            await UserModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                status: true,
                msg: 'Account Successfully Deleted'
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Occurred While Deleting Account..'
            })
        }
    }

}