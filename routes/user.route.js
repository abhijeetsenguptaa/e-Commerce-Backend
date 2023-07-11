require('dotenv').config()
const express = require('express');
const { userRegistration, userLogin, resetPassword, userList, updatingUser, deletingUser } = require('../controllers/user.controller');
const { authentication, authorization } = require('../middleware/authentication.middleware');


const userRoute = express.Router();

userRoute.post('/register', userRegistration);

userRoute.post('/login', userLogin);

userRoute.post('/reset', resetPassword);

userRoute.get('/', authentication, authorization(["admin"]), userList);

userRoute.patch('/update', authentication, updatingUser);

userRoute.delete('/delete', authentication, deletingUser);

module.exports = { userRoute }