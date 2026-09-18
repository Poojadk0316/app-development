const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        donorName: {
            type: String,
            required: true,
            trim: true
        },

        foodName: {
            type: String,
            required: true,
            trim: true
        },

        foodType: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true
        },

        quantityUnit: {
            type: String,
            required: true
        },

        preparationTime: {
            type: Date,
            required: true
        },

        expiryTime: {
            type: Date,
            required: true
        },

        pickupStart: {
            type: Date,
            required: true
        },

        pickupEnd: {
            type: Date,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Available",
                "Requested",
                "Accepted",
                "Pickup Assigned",
                "Picked Up",
                "Completed",
                "Expired",
                "Cancelled"
            ],
            default: "Available"
        },

        acceptedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        acceptedAt: {
            type: Date,
            default: null
        },

        pickupStatus: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Donation =
    mongoose.model("Donation", donationSchema);

module.exports = Donation;