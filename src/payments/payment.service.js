const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Payments = require('./payment.model');
const { initializePayment, verifyPayment } = require('../config/paystack');
const Users = require('../users/user.model');

const initPayment = async (bookingId, paymentBody) => {
    const paymentResponse = await initializePayment(paymentBody);
    console.log(paymentResponse);

    paymentResponse.amount = paymentBody.amount;
    paymentResponse.email = paymentBody.email;
    paymentResponse.booking = bookingId;

    await Payments.create(paymentResponse);

    return paymentResponse.authorization_url;
};

const paystackCallback = async (reference) => {
    const paymentDetails = await verifyPayment(reference);

    const { status } = paymentDetails;

    const payment = await Payments.findOneAndUpdate(
        { reference },
        { status },
        { returnDocument: 'after' }
    );

    return { status, reference };
};

module.exports = {
    initPayment,
    paystackCallback,
};
