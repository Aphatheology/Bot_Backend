const flightService = require("./flight.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createSingleFlight = catchAsync(async (req, res) => {
    const flight = await flightService.createSingleFlight(req.body);
    res.status(httpStatus.CREATED).send(flight);
});

const createMultipleFlights = catchAsync(async (req, res) => {
    const flights = await flightService.createMultipleFlights(req.body);
    res.send(flights);
});

const getAvailableFlights = catchAsync(async (req, res) => {
  const availableFlights = await flightService.getAvailableFlights(req.query);

  res.status(httpStatus.OK).json(availableFlights);
});

const getAllFlights = catchAsync(async (req, res) => {
  const allFlights = await flightService.getAllFlights();

  res.status(httpStatus.OK).json(allFlights);
});

module.exports = {
  createMultipleFlights,
  createSingleFlight,
  getAvailableFlights,
  getAllFlights,
};
