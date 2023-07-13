const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { addingReview, deletingReview, updatingReview } = require('../controllers/review.controller');


const reviewRoute = express.Router();

reviewRoute.post("/:id", authentication, addingReview);

reviewRoute.delete("/:productId/:reviewId", authentication, deletingReview);

reviewRoute.patch("/:id", authentication, updatingReview);



module.exports = { reviewRoute };