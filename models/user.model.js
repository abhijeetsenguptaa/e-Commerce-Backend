const mongoose = require('mongoose');


module.exports = {
    UserModel: mongoose.model('users', mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address"
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer"
        },
        securityQuestion: {
            type: String,
            // enum: [
            //     'What is your mother\'s maiden name?',
            //     'What was the name of your first pet?',
            //     'In which city were you born?',
            //     'What is your favorite movie?',
            //     'What is the name of your favorite teacher?',
            //     'What is your favorite book?',
            //     'What is the make and model of your first car?',
            //     'What is your favorite vacation destination?',
            //     'What is the name of your best childhood friend?',
            //     'What is the middle name of your oldest sibling?'
            // ]
        },
        securityAnswer: String
    }, {
        versionKey: false
    }))
}