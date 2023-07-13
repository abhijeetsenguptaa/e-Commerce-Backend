const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { payingOrder, fetchingPayments, updatingPayments, deletingPayments, allPayments } = require('../controllers/payment.controller');



const paymentRoute = express.Router();


paymentRoute.post('/:id', authentication, payingOrder);

paymentRoute.get('/', authentication, fetchingPayments);

paymentRoute.get('/all', authentication, allPayments);

paymentRoute.patch('/:id', authentication, updatingPayments);

paymentRoute.delete(':id', authentication, deletingPayments);



module.exports = { paymentRoute };