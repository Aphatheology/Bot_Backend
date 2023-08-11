const httpStatus = require('http-status');
const paymentService = require('./payment.service');
const catchAsync = require('../utils/catchAsync');

const initPayment = catchAsync(async (req, res) => {
    const payment = await paymentService.initPayment(req.params.bookingId, req.body);
    res.status(httpStatus.CREATED).send(payment);
});

const paystackCallback = catchAsync(async (req, res) => {
    const payment = await paymentService.paystackCallback(req.query.reference);
    res.status(httpStatus.CREATED).send(payment);
});

const webhook = catchAsync(async (req, res) => {
    const eventData = req.body;
    console.log(eventData);
    res.status(httpStatus.OK).send(eventData);
});

module.exports = {
    initPayment,
    paystackCallback,
    webhook,
};
