const Joi = require('joi');
const { objectId } = require("../utils/custom.validation");

const createBooking = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobileNumber: Joi.number().required(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
    createBooking,
};
