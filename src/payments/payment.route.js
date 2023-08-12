const express = require('express');
const validate = require('../middleware/validate');
const router = express.Router();
const paymentController = require('./payment.controller');
const paymentValidation = require('./payment.validation');

router.route('/').get(
    validate(paymentValidation.verifyPayment),
    paymentController.paystackCallback
);

router
    .route('/:bookingId')
    .post(
        validate(paymentValidation.initPayment),
        paymentController.initPayment
    );

module.exports = router;
