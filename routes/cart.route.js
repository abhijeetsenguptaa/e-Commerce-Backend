const express = require('express');
const { addingToCart, fetchingCart, updateItem, deleteItem } = require('../controllers/cart.controler');
const { authentication } = require('../middleware/authentication.middleware');



const cartRoute = express.Router();


cartRoute.post('/', authentication, addingToCart);

cartRoute.get('/', authentication, fetchingCart);

cartRoute.patch('/:id', authentication, updateItem);

cartRoute.delete('/:id', authentication, deleteItem);

module.exports = { cartRoute };