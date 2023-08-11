const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const flightSchema = new mongoose.Schema({
    departure: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        default: uuidv4,
    },
});

flightSchema.set('timestamps', true);
flightSchema.index({ departure: 1, destination: 1, date: 1 });

module.exports = mongoose.models.Flight || mongoose.model('Flight', flightSchema);

// const FlightModel = mongoose.models.Flight || mongoose.model('Flight', flightSchema);

// module.exports = FlightModel;
