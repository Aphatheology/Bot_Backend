const express = require("express");
const config = require("./src/config/config");
const morgan = require("./src/config/morgan");
const passport = require("passport");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const paymentRoute = require("./src/payments/payment.route");
const flightRoute = require("./src/flights/flight.route");
require("./src/config/passport");
const bookingRoute = require("./src/bookings/booking.route");
require("./src/config/passport");

const app = express();

if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
app.use(express.json());
app.use(passport.initialize());

app.use("/payment", paymentRoute);
app.use("/flight", flightRoute);
app.use("/booking", bookingRoute);

app.get("/", (req, res) => {
    res.send({ message: "Welcome to Flight Bot Backend" });
});
app.use("*", (req, res) => {
    res.send({ message: "Route Not found" });
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
