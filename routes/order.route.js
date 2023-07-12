const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { addingOrders, fetchingOrders } = require('../controllers/order.controller');


const orderRoute = express.Router();


orderRoute.post('/', authentication, addingOrders);

orderRoute.get('/', authentication, fetchingOrders);


module.exports = { orderRoute };