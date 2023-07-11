const mongoose = require('mongoose');


module.exports = {
    AddressModel: mongoose.model('address', mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    }, {
        versionKey: false
    }))
}