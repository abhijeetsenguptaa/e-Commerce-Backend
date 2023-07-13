const { ProductModel } = require("../models/product.model");
const { ReviewModel } = require("../models/review.model");


module.exports = {
    addingReview: async (req, res) => {
        try {
            const id = req.params.id;
            const { rating, comment } = req.body;

            const review = new ReviewModel({ user: user, product: id, rating, comment });
            await review.save();

            const product = await ProductModel.findOne({ _id: id });
            product.reviews.push({ userID: review.user, reviewID: review._id }); // Assuming the field name is "reviews" and not "review"

            await product.save();
            res.status(200).json({
                status: true,
                msg: 'Reviews added'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

    deletingReview: async (req, res) => {
        const productId = req.params.productId;
        const reviewId = req.params.reviewId;

        try {
            const product = await ProductModel.findOne({ _id: productId });

            if (!product || !product.reviews || product.reviews.length === 0) {
                return res.status(404).json({
                    status: false,
                    error: 'Product or reviews not found'
                });
            }

            let reviewIndex = -1;

            for (let i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i].reviewID == reviewId) {
                    reviewIndex = i;
                    break;
                }
            }

            if (reviewIndex === -1) {
                return res.status(404).json({
                    status: false,
                    error: 'Review not found'
                });
            }

            product.reviews.splice(reviewIndex, 1);
            await ReviewModel.findByIdAndDelete(reviewId);
            await product.save();

            res.status(200).json({
                status: true,
                msg: 'Comment Deleted'
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },



    updatingReview: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await ReviewModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: true,
                msg: 'Comment Updated!'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    }
}