const mongoose = require('mongoose');


module.exports = {
    CartModel: mongoose.model('carts', mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }]
    }, {
        versionKey: false
    }))
}