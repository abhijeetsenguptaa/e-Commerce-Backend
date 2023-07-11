require('dotenv').config()
const express = require('express');
const { userRegistration, userLogin, resetPassword } = require('../controllers/user.controller');


const userRoute = express.Router();

userRoute.post('/register', userRegistration);

userRoute.post('/login', userLogin);

userRoute.post('/reset', resetPassword);

module.exports = { userRoute }