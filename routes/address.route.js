const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { addAddress, getAddress, deleteAddress, updateAddress } = require('../controllers/address.controller');



const addressRoute = express.Router();

addressRoute.post('/', authentication, addAddress);

addressRoute.get('/', authentication, getAddress);

addressRoute.delete('/:id', authentication, deleteAddress);

addressRoute.patch('/:id', authentication, updateAddress);

module.exports = { addressRoute };