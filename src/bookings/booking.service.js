const Booking = require('./booking.model');

const createBooking = async (flightId, reqBody) => {
    reqBody.status = 'UNPAID';
    reqBody.flight = flightId;
    const booking = await Booking.create(reqBody);
    return booking;
};

module.exports = {
    createBooking,
};
