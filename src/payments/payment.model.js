const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        reference: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            required: true,
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    }
);

paymentSchema.set("timestamps", true);

module.exports = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);;
