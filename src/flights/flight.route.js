const express = require("express");
const validate = require("../middleware/validate");
const router = express.Router();
const flightController = require("./flight.controller");
const flightValidation = require("./flight.validation");

router
    .route("/create-single")
    .post(validate(flightValidation.createSingleFlight), flightController.createSingleFlight);
router
    .route("/create-multiple")
    .post(validate(flightValidation.createMultipleFlights), flightController.createMultipleFlights);

    router.route('/get-available-flights').get(validate(flightValidation.getAvailableFlights), flightController.getAvailableFlights);

    router.route('/').get(flightController.getAllFlights);

module.exports = router;
