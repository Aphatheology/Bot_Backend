const express = require('express');
const validate = require('../middleware/validate');
const router = express.Router();
const bookingController = require('./booking.controller');
const bookingValidation = require('./booking.validation');

router
    .route('/:id')
    .post(
        validate(bookingValidation.createBooking),
        bookingController.createBooking
    );

module.exports = router;
