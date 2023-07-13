const express = require('express');
const { authentication, authorization } = require('../middleware/authentication.middleware');
const { addingOrders, fetchingOrders, updatingOrders, deletingOrders } = require('../controllers/order.controller');


const orderRoute = express.Router();


orderRoute.post('/', authentication, addingOrders);

orderRoute.get('/', authentication, fetchingOrders);

orderRoute.patch('/:id', authentication, authorization(['admin', 'seller']), updatingOrders);

orderRoute.delete('/:id', authentication, deletingOrders);

module.exports = { orderRoute };