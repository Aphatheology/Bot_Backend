const Flight = require('./flight.model');

const createSingleFlight = async (reqBody) => {
    const flight = await Flight.create(reqBody);
    return flight;
};

const createMultipleFlights = async (reqBody) => {
    const flights = await Flight.insertMany(reqBody);

    return flights;
};

const getAvailableFlights = async (reqQuery) => {
    const userDate = new Date(reqQuery.date);
    const startDate = new Date(userDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(userDate);
    endDate.setHours(23, 59, 59, 999);

    const query = {
        departure: { $regex: new RegExp(reqQuery.departure, 'i') },
        destination: { $regex: new RegExp(reqQuery.destination, 'i') },
        date: { $gte: startDate, $lte: endDate },
    };

    const availableFlights = await Flight.find(query);

    return availableFlights;
};

const getAllFlights = async () => {
    const allFlights = await Flight.find();

    return allFlights;
};

module.exports = {
    createMultipleFlights,
    createSingleFlight,
    getAvailableFlights,
    getAllFlights,
};
