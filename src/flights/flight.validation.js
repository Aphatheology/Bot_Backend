const Joi = require('joi');

const createSingleFlight = {
    body: Joi.object().keys({
        departure: Joi.string().required(),
        destination: Joi.string().required(),
        date: Joi.date().iso().greater('now').required(),
        price: Joi.number().required(),
    }),
};

const createMultipleFlights = {
    body: Joi.array().items(
        Joi.object({
            departure: Joi.string().required(),
            destination: Joi.string().required(),
            date: Joi.date().iso().greater('now').required(),
            price: Joi.number().required(),
        })
    ),
};

const getAvailableFlights = {
  query: Joi.object().keys({
      departure: Joi.string().required(),
      destination: Joi.string().required(),
      date: Joi.date().iso().greater('now').required(),
  }),
};

module.exports = {
    createSingleFlight,
    createMultipleFlights,
    getAvailableFlights
};
