const express = require("express");
const mongoose = require("mongoose");

const Donation = require("../models/Donation");
const User = require("../models/users");

const router = express.Router();


// =====================================================
// MARK EXPIRED DONATIONS
// =====================================================

const updateExpiredDonations = async () => {
    try {

        await Donation.updateMany(
            {
                expiryTime: {
                    $lte: new Date()
                },

                status: {
                    $in: [
                        "Available",
                        "Requested"
                    ]
                }
            },
            {
                $set: {
                    status: "Expired"
                }
            }
        );

    } catch (error) {

        console.error(
            "Error updating expired donations:",
            error.message
        );
    }
};


// =====================================================
// CHECK DONOR OWNERSHIP
// =====================================================

const checkDonorOwnership = async (donation, donorId) => {

    if (!donorId) {
        return false;
    }

    if (
        !mongoose.Types.ObjectId.isValid(
            donorId
        )
    ) {
        return false;
    }

    if (!donation.donorId) {
        return false;
    }

    return (
        donation.donorId.toString() ===
        donorId.toString()
    );
};


// =====================================================
// GET ALL DONATIONS
// =====================================================

router.get("/", async (req, res) => {
    try {

        await updateExpiredDonations();

        const donations =
            await Donation.find()
                .populate(
                    "acceptedBy",
                    "name email role"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json(
            donations
        );

    } catch (error) {

        console.error(
            "Error fetching donations:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to fetch donations"
        });
    }
});


// =====================================================
// GET ONE DONATION
// =====================================================

router.get("/:id", async (req, res) => {
    try {

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return res.status(400).json({
                message:
                    "Invalid donation ID"
            });
        }

        await updateExpiredDonations();

        const donation =
            await Donation.findById(
                req.params.id
            ).populate(
                "acceptedBy",
                "name email role"
            );

        if (!donation) {

            return res.status(404).json({
                message:
                    "Donation not found"
            });
        }

        res.status(200).json(
            donation
        );

    } catch (error) {

        console.error(
            "Error fetching donation:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to fetch donation"
        });
    }
});


// =====================================================
// ADD NEW DONATION
// =====================================================

router.post("/", async (req, res) => {
    try {

        const {
            donorId,
            donorName,
            foodName,
            foodType,
            quantity,
            quantityUnit,
            preparationTime,
            expiryTime,
            pickupStart,
            pickupEnd,
            location,
            description
        } = req.body;


        // =================================================
        // REQUIRED FIELDS
        // =================================================

        if (
            !foodName ||
            !foodType ||
            !quantity ||
            !quantityUnit ||
            !preparationTime ||
            !expiryTime ||
            !pickupStart ||
            !pickupEnd ||
            !location ||
            !donorName
        ) {

            return res.status(400).json({
                message:
                    "Please provide all required donation details"
            });
        }


        // =================================================
        // CHECK EXPIRY TIME
        // =================================================

        if (
            new Date(expiryTime) <=
            new Date()
        ) {

            return res.status(400).json({
                message:
                    "Expiry time must be in the future"
            });
        }


        // =================================================
        // CHECK PICKUP TIMES
        // =================================================

        if (
            new Date(pickupStart) >=
            new Date(pickupEnd)
        ) {

            return res.status(400).json({
                message:
                    "Pickup end time must be after pickup start time"
            });
        }


        // =================================================
        // VALIDATE DONOR ID
        // =================================================

        if (
            donorId &&
            !mongoose.Types.ObjectId.isValid(
                donorId
            )
        ) {

            return res.status(400).json({
                message:
                    "Invalid donor ID"
            });
        }


        // =================================================
        // CHECK DONOR EXISTS
        // =================================================

        if (donorId) {

            const donor =
                await User.findById(
                    donorId
                );

            if (!donor) {

                return res.status(404).json({
                    message:
                        "Donor not found"
                });
            }

            if (
                donor.role !==
                "DONOR"
            ) {

                return res.status(400).json({
                    message:
                        "Only a donor can create a donation"
                });
            }
        }


        // =================================================
        // CREATE DONATION
        // =================================================

        const newDonation =
            new Donation({

                donorId:
                    donorId || null,

                donorName,

                foodName,

                foodType,

                quantity,

                quantityUnit,

                preparationTime,

                expiryTime,

                pickupStart,

                pickupEnd,

                location,

                description
            });


        // =================================================
        // SAVE
        // =================================================

        const savedDonation =
            await newDonation.save();

        console.log(
            "New Donation Added:",
            savedDonation
        );

        res.status(201).json({

            message:
                "Donation created successfully",

            donation:
                savedDonation

        });

    } catch (error) {

        console.error(
            "Error adding donation:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to create donation"
        });
    }
});


// =====================================================
// UPDATE DONATION STATUS
// =====================================================

router.put("/:id/status", async (req, res) => {
    try {

        const {
            status,
            acceptedBy,
            acceptedAt,
            pickupStatus,
            donorId
        } = req.body;


        // =================================================
        // VALIDATE DONATION ID
        // =================================================

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return res.status(400).json({
                message:
                    "Invalid donation ID"
            });
        }


        // =================================================
        // CHECK STATUS
        // =================================================

        if (!status) {

            return res.status(400).json({
                message:
                    "Status is required"
            });
        }


        // =================================================
        // FIND DONATION
        // =================================================

        const donation =
            await Donation.findById(
                req.params.id
            );

        if (!donation) {

            return res.status(404).json({
                message:
                    "Donation not found"
            });
        }


        // =================================================
        // ACCEPT DONATION
        // =================================================

        if (
            status ===
            "Accepted"
        ) {

            // Check expiry

            if (
                new Date(
                    donation.expiryTime
                ) <= new Date()
            ) {

                donation.status =
                    "Expired";

                await donation.save();

                return res.status(400).json({
                    message:
                        "This donation has expired and cannot be accepted"
                });
            }


            // Receiver ID required

            if (!acceptedBy) {

                return res.status(400).json({
                    message:
                        "Receiver ID is required to accept donation"
                });
            }


            // Validate receiver ID

            if (
                !mongoose.Types.ObjectId.isValid(
                    acceptedBy
                )
            ) {

                return res.status(400).json({
                    message:
                        "Invalid receiver ID"
                });
            }


            // Check receiver

            const receiver =
                await User.findById(
                    acceptedBy
                );

            if (!receiver) {

                return res.status(404).json({
                    message:
                        "Receiver not found"
                });
            }


            // Check role

            if (
                receiver.role !==
                "RECEIVER"
            ) {

                return res.status(400).json({
                    message:
                        "Only a receiver can accept a donation"
                });
            }


            // Prevent accepting an already
            // accepted donation

            if (
                donation.status !==
                "Available"
            ) {

                return res.status(400).json({
                    message:
                        "This donation is no longer available"
                });
            }


            donation.status =
                "Accepted";

            donation.acceptedBy =
                acceptedBy;

            donation.acceptedAt =
                acceptedAt
                    ? new Date(
                        acceptedAt
                    )
                    : new Date();

            donation.pickupStatus =
                pickupStatus ||
                "Pending Pickup";
        }


        // =================================================
        // PICKUP ASSIGNED
        // =================================================

        else if (
            status ===
            "Pickup Assigned"
        ) {

            if (!donation.acceptedBy) {

                return res.status(400).json({
                    message:
                        "Donation must be accepted before pickup can be assigned"
                });
            }

            donation.status =
                "Pickup Assigned";

            donation.pickupStatus =
                pickupStatus ||
                "Pickup Assigned";
        }


        // =================================================
        // PICKED UP
        // =================================================

        else if (
            status ===
            "Picked Up"
        ) {

            if (!donation.acceptedBy) {

                return res.status(400).json({
                    message:
                        "Donation must be accepted before pickup"
                });
            }

            donation.status =
                "Picked Up";

            donation.pickupStatus =
                pickupStatus ||
                "Picked Up";
        }


        // =================================================
        // COMPLETED
        // =================================================

        else if (
            status ===
            "Completed"
        ) {

            if (!donation.acceptedBy) {

                return res.status(400).json({
                    message:
                        "Donation must be accepted before completion"
                });
            }

            donation.status =
                "Completed";

            donation.pickupStatus =
                pickupStatus ||
                "Completed";
        }


        // =================================================
        // OTHER STATUSES
        // =================================================

        else {

            // Only the original donor can
            // manually change other statuses

            if (
                donorId &&
                donation.donorId
            ) {

                const isOwner =
                    await checkDonorOwnership(
                        donation,
                        donorId
                    );

                if (!isOwner) {

                    return res.status(403).json({
                        message:
                            "You are not authorized to modify this donation"
                    });
                }
            }

            donation.status =
                status;

            if (
                pickupStatus !==
                undefined
            ) {

                donation.pickupStatus =
                    pickupStatus;
            }

            if (
                acceptedBy !==
                undefined &&
                acceptedBy !==
                null
            ) {

                if (
                    mongoose.Types.ObjectId.isValid(
                        acceptedBy
                    )
                ) {

                    donation.acceptedBy =
                        acceptedBy;
                }
            }

            if (
                acceptedAt !==
                undefined &&
                acceptedAt !==
                null
            ) {

                donation.acceptedAt =
                    new Date(
                        acceptedAt
                    );
            }
        }


        // =================================================
        // SAVE UPDATED DONATION
        // =================================================

        const updatedDonation =
            await donation.save();


        // =================================================
        // POPULATE RECEIVER
        // =================================================

        await updatedDonation.populate(
            "acceptedBy",
            "name email role"
        );


        console.log(
            "Donation Updated:",
            updatedDonation
        );


        // =================================================
        // RESPONSE
        // =================================================

        res.status(200).json({

            message:
                "Donation updated successfully",

            donation:
                updatedDonation

        });

    } catch (error) {

        console.error(
            "Error updating donation:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to update donation"
        });
    }
});


// =====================================================
// DELETE DONATION
// =====================================================

router.delete("/:id", async (req, res) => {
    try {

        const {
            donorId
        } = req.body;


        // =================================================
        // VALIDATE DONATION ID
        // =================================================

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return res.status(400).json({
                message:
                    "Invalid donation ID"
            });
        }


        // =================================================
        // FIND DONATION
        // =================================================

        const donation =
            await Donation.findById(
                req.params.id
            );


        if (!donation) {

            return res.status(404).json({
                message:
                    "Donation not found"
            });
        }


        // =================================================
        // CHECK OWNERSHIP
        // =================================================

        if (!donorId) {

            return res.status(400).json({
                message:
                    "Donor ID is required"
            });
        }


        const isOwner =
            await checkDonorOwnership(
                donation,
                donorId
            );


        if (!isOwner) {

            return res.status(403).json({
                message:
                    "You are not authorized to delete this donation"
            });
        }


        // =================================================
        // PREVENT DELETING ACCEPTED DONATIONS
        // =================================================

        if (
            [
                "Accepted",
                "Pickup Assigned",
                "Picked Up",
                "Completed"
            ].includes(
                donation.status
            )
        ) {

            return res.status(400).json({
                message:
                    "Accepted or completed donations cannot be deleted"
            });
        }


        // =================================================
        // DELETE
        // =================================================

        const deletedDonation =
            await Donation.findByIdAndDelete(
                req.params.id
            );


        console.log(
            "Donation Deleted:",
            deletedDonation
        );


        res.status(200).json({

            message:
                "Donation deleted successfully",

            donation:
                deletedDonation

        });

    } catch (error) {

        console.error(
            "Error deleting donation:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to delete donation"
        });
    }
});


module.exports = router;