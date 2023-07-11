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
            enum: ["customer", "seller", "admin"]
        }
    }, {
        versionKey: false
    }))
}