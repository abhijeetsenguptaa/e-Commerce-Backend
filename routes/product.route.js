const express = require('express');
const { authentication, authorization } = require('../middleware/authentication.middleware');
const { addingProduct, updateProduct, deleteProduct, fetchingProduct } = require('../controllers/product.controller');


const productRoute = express.Router();


productRoute.post('/', authentication, authorization(["seller", "admin"]), addingProduct);

productRoute.patch('/', authentication, authorization(["seller", "admin"]), updateProduct);

productRoute.delete('/', authentication, authorization(["seller", "admin"]), deleteProduct);

productRoute.get('/', fetchingProduct);

module.exports = { productRoute };