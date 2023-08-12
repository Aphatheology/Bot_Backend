const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const fs = require('fs').promises;
const uuid = require('uuid');
const { initializePayment, verifyPayment } = require('../config/paystack');
const { bookingData } = require('../bookings/booking.data');
const { paymentData } = require('./payment.data');

const paymentDataFilePath = 'src/payments/payment.data.js';
const bookingDataFilePath = 'src/bookings/booking.data.js';

const initPayment = async (bookingId) => {
    const existingBooking = bookingData.bookings.find(
        (booking) => booking.id === bookingId
    );
    if (!existingBooking) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    if (existingBooking.status == 'PAID') {
        throw new ApiError(
            httpStatus.CONFLICT,
            'Booking have already been paid for, thanks.'
        );
    }

    const paymentResponse = await initializePayment({
        email: existingBooking.email,
        amount: existingBooking.amount,
    });

    paymentResponse.amount = existingBooking.amount;
    paymentResponse.email = existingBooking.email;
    paymentResponse.booking = bookingId;

    const newPayment = {
        ...paymentResponse,
        id: uuid.v4(),
    };

    paymentData.payments.push(newPayment);
    await fs.writeFile(
        paymentDataFilePath,
        `exports.paymentData = ${JSON.stringify(paymentData, null, 2)}`,
        'utf-8'
    );

    return paymentResponse.authorization_url;
};

const paystackCallback = async (reference) => {
    const existingPayment = paymentData.payments.find(
        (payment) => payment.reference === reference
    );
    if (!existingPayment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }

    const paymentDetails = await verifyPayment(reference);

    const { status } = paymentDetails;

    const paymentIndex = paymentData.payments.findIndex(
        (payment) => payment.reference === reference
    );
    paymentData.payments[paymentIndex].status = status;

    if (status == 'success') {
        const bookingIndex = bookingData.bookings.findIndex(
            (booking) => booking.id === existingPayment.booking
        );
        bookingData.bookings[bookingIndex].status = 'PAID';
        await fs.writeFile(
            bookingDataFilePath,
            `exports.paymentData = ${JSON.stringify(bookingData, null, 2)}`,
            'utf-8'
        );
    }

    await fs.writeFile(
        paymentDataFilePath,
        `exports.paymentData = ${JSON.stringify(paymentData, null, 2)}`,
        'utf-8'
    );

    return { status, reference };
};

module.exports = {
    initPayment,
    paystackCallback,
};
