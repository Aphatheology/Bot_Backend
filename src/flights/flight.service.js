const flightData = require('./flight.data');

const getAvailableFlights = async (reqQuery) => {
    const userDate = new Date(reqQuery.date);
    const startDate = new Date(userDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(userDate);
    endDate.setHours(23, 59, 59, 999);

    const availableFlights = flightData.filter((flight) => {
        const flightDate = new Date(flight.date);
        return (
            flight.departure
                .toLowerCase()
                .includes(reqQuery.departure.toLowerCase()) &&
            flight.destination
                .toLowerCase()
                .includes(reqQuery.destination.toLowerCase()) &&
            flightDate >= startDate &&
            flightDate <= endDate
        );
    });

    return availableFlights;
};

const getAllFlights = async () => {
    return flightData;
};

module.exports = {
    getAvailableFlights,
    getAllFlights,
};
