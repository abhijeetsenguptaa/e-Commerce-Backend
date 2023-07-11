const mongoose = require('mongoose');


module.exports = {
    ReviewModel: mongoose.model('reviews', mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        rating: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            default: 0
        },
        comment: String
    }, {
        versionKey: false
    }))
}