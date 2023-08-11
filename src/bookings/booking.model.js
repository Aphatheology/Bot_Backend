const mongoose = require('mongoose');

const BookingStatus = ['UNPAID', 'PAID', 'CANCELLED'];

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'UNPAID',
        enum: BookingStatus,
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: false,
    },
});

bookingSchema.set('timestamps', true);

module.exports =
    mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
