const mongoose = require('mongoose');


module.exports = {
    OrderModel: mongoose.model('orders', mongoose.Schema({
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
        }],
        totalAmount: Number,
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered'],
            default: 'pending'
        },
        purchasedOn: {
            type: Date,
            default: Date.now
        }
    }, {
        versionKey: false
    }))
}