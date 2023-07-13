const mongoose = require('mongoose');


module.exports = {
    ProductModel: mongoose.model('products', mongoose.Schema({
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        name: String,
        description: String,
        price: Number,
        quantity: Number,
        category: {
            type: String,
            enum: ['Electronics', 'Clothing', 'Books', 'Home Decor']
        },
        image: String,
        reviews: [{
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            reviewID:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'reviews'
            }
        }]
    }, {
        versionKey: false
    }))
}