const bookingService = require("./booking.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createBooking = catchAsync(async (req, res) => {
    const booking = await bookingService.createBooking(req.params.flightCode, req.body);
    res.status(httpStatus.CREATED).send(booking);
});

const getAllBookings = catchAsync(async (req, res) => {
  const booking = await bookingService.getAllBookings();
  res.status(httpStatus.CREATED).send(booking);
});

module.exports = {
  createBooking,
  getAllBookings,
};
