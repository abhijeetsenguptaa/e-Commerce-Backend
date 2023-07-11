const mongoose = require('mongoose');



module.exports = {
    PaymentModel: mongoose.model('payments', mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'orders'
        },
        paymentMethod: String,
        cardNumber: String,
        amount: Number,
        status: {
            type: String,
            enum: ['paid', 'pending', 'failed'],
            default: 'pending'
        }
    }, {
        versionKey: false
    }))
}