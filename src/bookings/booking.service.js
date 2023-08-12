const fs = require('fs').promises;
const uuid = require('uuid');
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const flightData = require('../flights/flight.data');
const { bookingData } = require('./booking.data');

const bookingDataFilePath = 'src/bookings/booking.data.js';

const createBooking = async (flightCode, reqBody) => {
    const selectedFlight = flightData.find(
        (flight) => flight.code === flightCode
    );

    if (!selectedFlight) {
      throw new ApiError(httpStatus.NOT_FOUND, `No flight found with code: ${flightCode}`);
    }

    reqBody.status = 'UNPAID';
    reqBody.flight = flightCode;
    reqBody.amount = selectedFlight.price;

    const newBooking = {
        ...reqBody,
        id: uuid.v4(),
    };

    bookingData.bookings.push(newBooking);
    await fs.writeFile(bookingDataFilePath, `exports.bookingData = ${JSON.stringify(bookingData, null, 2)}`, 'utf-8');

    return newBooking;
};

module.exports = {
    createBooking,
};
