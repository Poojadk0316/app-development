import { useEffect, useState } from "react";

function DonorDashboard() {

    /* =====================================================
       CURRENT USER
    ===================================================== */

    const currentUser =
        JSON.parse(
            localStorage.getItem("foodRescueCurrentUser")
        ) || {
            name: "FoodRescue Donor",
            role: "DONOR"
        };

    const currentUserId =
        currentUser.id ||
        currentUser._id ||
        null;


    /* =====================================================
       DONATIONS
    ===================================================== */

    const [donations, setDonations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =====================================================
       FORM VISIBILITY
    ===================================================== */

    const [showForm, setShowForm] =
        useState(false);


    /* =====================================================
       SELECTED DONATION
    ===================================================== */

    const [selectedDonation, setSelectedDonation] =
        useState(null);


    /* =====================================================
       FORM STATES
    ===================================================== */

    const [foodName, setFoodName] =
        useState("");

    const [foodType, setFoodType] =
        useState("");

    const [quantity, setQuantity] =
        useState("");

    const [quantityUnit, setQuantityUnit] =
        useState("kg");

    const [preparationTime, setPreparationTime] =
        useState("");

    const [expiryTime, setExpiryTime] =
        useState("");

    const [pickupStart, setPickupStart] =
        useState("");

    const [pickupEnd, setPickupEnd] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [description, setDescription] =
        useState("");


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    /* =====================================================
       GET RECEIVER NAME
    ===================================================== */

    const getReceiverName = (donation) => {

        if (!donation.acceptedBy) {
            return "Not accepted yet";
        }

        if (
            typeof donation.acceptedBy === "object"
        ) {

            return (
                donation.acceptedBy.name ||
                donation.acceptedBy.email ||
                "Receiver"
            );
        }

        return donation.acceptedBy;
    };


    /* =====================================================
       CHECK CURRENT DONOR
    ===================================================== */

    const belongsToCurrentDonor = (
        donation
    ) => {

        if (donation.donorId) {

            const donationDonorId =
                typeof donation.donorId === "object"
                    ? donation.donorId._id ||
                      donation.donorId.id
                    : donation.donorId;

            if (
                currentUserId &&
                String(donationDonorId) ===
                String(currentUserId)
            ) {

                return true;
            }

            return false;
        }

        return (
            donation.donorName ===
            currentUser.name
        );
    };


    /* =====================================================
       LOAD DONATIONS
    ===================================================== */

    const fetchDonations = async (
        showLoading = false
    ) => {

        try {

            if (showLoading) {
                setLoading(true);
            }

            setError("");

            const response = await fetch(
                "http://localhost:5000/api/donations"
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to fetch donations"
                );
            }

            const data =
                await response.json();

            const myDonations =
                data.filter(
                    (donation) =>
                        belongsToCurrentDonor(
                            donation
                        )
                );

            setDonations(
                myDonations
            );


            /* =================================================
               UPDATE OPEN MODAL WITH LATEST DATA
            ================================================= */

            setSelectedDonation(
                (previousDonation) => {

                    if (!previousDonation) {
                        return null;
                    }

                    const updatedDonation =
                        myDonations.find(
                            (donation) =>
                                donation._id ===
                                previousDonation._id
                        );

                    return (
                        updatedDonation ||
                        previousDonation
                    );
                }
            );

        } catch (error) {

            console.error(
                "Error fetching donations:",
                error
            );

            setError(
                "Unable to load donations. Please make sure the backend is running."
            );

        } finally {

            if (showLoading) {
                setLoading(false);
            }
        }
    };


    /* =====================================================
       FETCH ON PAGE LOAD + AUTO REFRESH
    ===================================================== */

    useEffect(() => {

        fetchDonations(true);

        const refreshInterval =
            setInterval(() => {

                fetchDonations(false);

            }, 5000);

        return () => {

            clearInterval(
                refreshInterval
            );

        };

    }, []);


    /* =====================================================
       ADD DONATION
    ===================================================== */

    const handleAddDonation = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const newDonation = {

                donorId:
                    currentUser.id ||
                    currentUser._id ||
                    null,

                donorName:
                    currentUser.name,

                foodName,

                foodType,

                quantity:
                    Number(quantity),

                quantityUnit,

                preparationTime,

                expiryTime,

                pickupStart,

                pickupEnd,

                location,

                description
            };


            const response = await fetch(
                "http://localhost:5000/api/donations",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        newDonation
                    )
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create donation"
                );
            }


            setDonations(
                (previousDonations) => [
                    data.donation,
                    ...previousDonations
                ]
            );


            /* CLEAR FORM */

            setFoodName("");
            setFoodType("");
            setQuantity("");
            setQuantityUnit("kg");
            setPreparationTime("");
            setExpiryTime("");
            setPickupStart("");
            setPickupEnd("");
            setLocation("");
            setDescription("");

            setShowForm(false);


            alert(
                "Food donation posted successfully! 🍱"
            );


        } catch (error) {

            console.error(
                "Error adding donation:",
                error
            );

            setError(
                error.message ||
                "Failed to post donation"
            );
        }
    };


    /* =====================================================
       STATISTICS
    ===================================================== */

    const activeDonations =
        donations.filter(
            (donation) =>
                donation.status === "Available" ||
                donation.status === "Requested" ||
                donation.status === "Accepted" ||
                donation.status === "Pickup Assigned" ||
                donation.status === "Picked Up"
        ).length;


    const completedDonations =
        donations.filter(
            (donation) =>
                donation.status === "Completed"
        ).length;


    /* =====================================================
       COMPLETED DONATIONS
    ===================================================== */

    const completedFood =
        donations.filter(
            (donation) =>
                donation.status === "Completed"
        );


    /* =====================================================
       CALCULATE FOOD RESCUED
    ===================================================== */

    const foodRescued =
        completedFood.reduce(
            (total, donation) => {

                const quantity =
                    Number(
                        donation.quantity
                    ) || 0;

                return total + quantity;

            },
            0
        );


    /* =====================================================
       FOOD RESCUED UNIT
    ===================================================== */

    const rescuedUnits =
        [
            ...new Set(
                completedFood
                    .map(
                        (donation) =>
                            donation.quantityUnit
                    )
                    .filter(Boolean)
            )
        ];


    const foodRescuedDisplay =
        completedFood.length === 0
            ? "0"
            : rescuedUnits.length === 1
                ? `${foodRescued} ${rescuedUnits[0]}`
                : `${foodRescued}`;


    /* =====================================================
       ACCEPTED / ACTIVE RESCUES
    ===================================================== */

    const acceptedDonations =
        donations.filter(
            (donation) =>
                donation.status === "Accepted" ||
                donation.status === "Pickup Assigned" ||
                donation.status === "Picked Up"
        );


    /* =====================================================
       RESCUE HISTORY
    ===================================================== */

    const rescueHistory =
        donations.filter(
            (donation) =>
                donation.acceptedBy &&
                (
                    donation.status === "Accepted" ||
                    donation.status === "Pickup Assigned" ||
                    donation.status === "Picked Up" ||
                    donation.status === "Completed"
                )
        );


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    const getStatusClass = (status) => {

        if (!status) {
            return "";
        }

        return status
            .toLowerCase()
            .replace(/\s+/g, "-");
    };


    /* =====================================================
       JSX
    ===================================================== */

    return (

        <main className="dashboard-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <section className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        DONOR DASHBOARD
                    </p>

                    <h1>
                        Welcome, {currentUser.name}! 👋
                    </h1>

                    <p>
                        Manage your surplus food donations and help
                        turn extra meals into meaningful impact.
                    </p>

                </div>


                <button
                    className="dashboard-primary-btn"
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    + Post Surplus Food
                </button>

            </section>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="dashboard-error">
                    {error}
                </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <section className="dashboard-stats">


                <div className="dashboard-stat-card">

                    <div className="stat-icon green">
                        🍱
                    </div>

                    <div>

                        <span>
                            Total Donations
                        </span>

                        <strong>
                            {donations.length}
                        </strong>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon orange">
                        🍽️
                    </div>

                    <div>

                        <span>
                            Food Rescued
                        </span>

                        <strong>
                            {foodRescuedDisplay}
                        </strong>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon blue">
                        ⏳
                    </div>

                    <div>

                        <span>
                            Active Donations
                        </span>

                        <strong>
                            {activeDonations}
                        </strong>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon purple">
                        ✅
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <strong>
                            {completedDonations}
                        </strong>

                    </div>

                </div>

            </section>


            {/* =================================================
                ACTIVE RESCUES
            ================================================= */}

            {acceptedDonations.length > 0 && (

                <section className="donations-section">

                    <div className="section-top">

                        <div>

                            <p className="dashboard-label">
                                RESCUE UPDATE
                            </p>

                            <h2>
                                Active Rescues
                            </h2>

                        </div>


                        <span className="donation-count">

                            {acceptedDonations.length}
                            {" "}
                            active

                        </span>

                    </div>


                    <div className="donation-list">

                        {acceptedDonations.map(
                            (donation) => (

                                <div
                                    className="donation-row"
                                    key={
                                        donation._id
                                    }
                                >

                                    <div className="donation-food-icon">
                                        🤝
                                    </div>


                                    <div className="donation-info">

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>

                                            Accepted by{" "}

                                            <strong>
                                                {
                                                    getReceiverName(
                                                        donation
                                                    )
                                                }
                                            </strong>

                                        </p>

                                    </div>


                                    <div className="donation-detail">

                                        <span>
                                            Quantity
                                        </span>

                                        <strong>

                                            {
                                                donation.quantity
                                            }{" "}

                                            {
                                                donation.quantityUnit
                                            }

                                        </strong>

                                    </div>


                                    <div className="donation-detail">

                                        <span>
                                            Pickup Status
                                        </span>

                                        <strong>

                                            {
                                                donation.pickupStatus ||
                                                "Pending Pickup"
                                            }

                                        </strong>

                                    </div>


                                    <div className="donation-actions">

                                        <span
                                            className={`donation-status ${getStatusClass(
                                                donation.status
                                            )}`}
                                        >

                                            {
                                                donation.status
                                            }

                                        </span>


                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                setSelectedDonation(
                                                    donation
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </section>

            )}


            {/* =================================================
                DONATION FORM
            ================================================= */}

            {showForm && (

                <section className="donation-form-card">

                    <div className="form-heading">

                        <div>

                            <p>
                                NEW DONATION
                            </p>

                            <h2>
                                Post Surplus Food
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="close-form-btn"
                            onClick={() =>
                                setShowForm(false)
                            }
                        >
                            ✕
                        </button>

                    </div>


                    <form
                        onSubmit={handleAddDonation}
                    >

                        <div className="form-grid">


                            <div className="form-group">

                                <label>
                                    Food Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Eg. Vegetable Rice"
                                    value={foodName}
                                    onChange={(e) =>
                                        setFoodName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Food Type
                                </label>

                                <select
                                    value={foodType}
                                    onChange={(e) =>
                                        setFoodType(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select food type
                                    </option>

                                    <option value="Cooked Food">
                                        Cooked Food
                                    </option>

                                    <option value="Bakery">
                                        Bakery
                                    </option>

                                    <option value="Fruits & Vegetables">
                                        Fruits & Vegetables
                                    </option>

                                    <option value="Packaged Food">
                                        Packaged Food
                                    </option>

                                    <option value="Dairy">
                                        Dairy
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Quantity
                                </label>

                                <div className="quantity-input">

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Eg. 10"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />


                                    <select
                                        value={quantityUnit}
                                        onChange={(e) =>
                                            setQuantityUnit(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="kg">
                                            kg
                                        </option>

                                        <option value="litres">
                                            Litres
                                        </option>

                                        <option value="packets">
                                            Packets
                                        </option>

                                        <option value="plates">
                                            Plates
                                        </option>

                                        <option value="pieces">
                                            Pieces
                                        </option>

                                        <option value="Meals">
                                            Meals
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="form-group">

                                <label>
                                    Preparation Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={preparationTime}
                                    onChange={(e) =>
                                        setPreparationTime(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Expiry Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={expiryTime}
                                    onChange={(e) =>
                                        setExpiryTime(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Pickup Start Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={pickupStart}
                                    onChange={(e) =>
                                        setPickupStart(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Pickup End Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={pickupEnd}
                                    onChange={(e) =>
                                        setPickupEnd(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Pickup Location
                                </label>

                                <input
                                    type="text"
                                    placeholder="Eg. BTM Layout, Bengaluru"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group form-full">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    placeholder="Add details about the food, packaging, dietary information, etc."
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    rows="4"
                                ></textarea>

                            </div>

                        </div>


                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="dashboard-primary-btn"
                            >
                                Post Donation →
                            </button>

                        </div>

                    </form>

                </section>

            )}


            {/* =================================================
                DONATION HISTORY
            ================================================= */}

            <section className="donations-section">

                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            RESCUE HISTORY
                        </p>

                        <h2>
                            Donation History
                        </h2>

                    </div>


                    <span className="donation-count">

                        {rescueHistory.length}
                        {" "}
                        rescues

                    </span>

                </div>


                <div className="donation-list">


                    {loading && (

                        <div className="donation-empty-state">
                            Loading donations...
                        </div>

                    )}


                    {!loading &&
                        donations.length === 0 && (

                            <div className="donation-empty-state">

                                <div>
                                    🍱
                                </div>

                                <h3>
                                    No donations yet
                                </h3>

                                <p>
                                    Post your first surplus food
                                    donation to get started.
                                </p>

                            </div>

                        )}


                    {!loading &&
                        donations.map(
                            (donation) => (

                                <div
                                    className="donation-row"
                                    key={
                                        donation._id
                                    }
                                >

                                    <div className="donation-food-icon">
                                        🍲
                                    </div>


                                    <div className="donation-info">

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>

                                            Donation #

                                            {
                                                donation._id
                                            }

                                        </p>

                                    </div>


                                    <div className="donation-detail">

                                        <span>
                                            Quantity
                                        </span>

                                        <strong>

                                            {
                                                donation.quantity
                                            }{" "}

                                            {
                                                donation.quantityUnit
                                            }

                                        </strong>

                                    </div>


                                    <div className="donation-detail">

                                        <span>
                                            Pickup
                                        </span>

                                        <strong>

                                            {
                                                formatDate(
                                                    donation.pickupStart
                                                )
                                            }

                                        </strong>

                                    </div>


                                    <div className="donation-actions">

                                        <span
                                            className={`donation-status ${getStatusClass(
                                                donation.status
                                            )}`}
                                        >

                                            {
                                                donation.status
                                            }

                                        </span>


                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                setSelectedDonation(
                                                    donation
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                </div>

            </section>


            {/* =================================================
                DONATION DETAILS MODAL
            ================================================= */}

            {selectedDonation && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setSelectedDonation(null)
                    }
                >

                    <div
                        className="donor-details-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        <button
                            className="modal-close"
                            onClick={() =>
                                setSelectedDonation(null)
                            }
                        >
                            ✕
                        </button>


                        <div className="modal-icon">
                            🍲
                        </div>


                        <p className="dashboard-label">
                            DONATION DETAILS
                        </p>


                        <h2>
                            {
                                selectedDonation.foodName
                            }
                        </h2>


                        <p className="modal-donor-name">

                            Donated by{" "}

                            <strong>
                                {
                                    selectedDonation.donorName
                                }
                            </strong>

                        </p>


                        <div className="modal-details">


                            <div>

                                <span>
                                    Food Type
                                </span>

                                <strong>
                                    {
                                        selectedDonation.foodType
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Quantity
                                </span>

                                <strong>

                                    {
                                        selectedDonation.quantity
                                    }{" "}

                                    {
                                        selectedDonation.quantityUnit
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Preparation
                                </span>

                                <strong>

                                    {
                                        formatDate(
                                            selectedDonation.preparationTime
                                        )
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Expiry
                                </span>

                                <strong>

                                    {
                                        formatDate(
                                            selectedDonation.expiryTime
                                        )
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Pickup Start
                                </span>

                                <strong>

                                    {
                                        formatDate(
                                            selectedDonation.pickupStart
                                        )
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Pickup End
                                </span>

                                <strong>

                                    {
                                        formatDate(
                                            selectedDonation.pickupEnd
                                        )
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Location
                                </span>

                                <strong>

                                    {
                                        selectedDonation.location
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Status
                                </span>

                                <strong>

                                    {
                                        selectedDonation.status
                                    }

                                </strong>

                            </div>

                        </div>


                        {/* =================================================
                            RECEIVER INFORMATION
                        ================================================= */}

                        {selectedDonation.acceptedBy && (

                            <div className="receiver-accepted-box">

                                <div className="accepted-box-icon">
                                    🤝
                                </div>


                                <div>

                                    <span>
                                        ACCEPTED BY
                                    </span>

                                    <strong>

                                        {
                                            getReceiverName(
                                                selectedDonation
                                            )
                                        }

                                    </strong>


                                    {selectedDonation.acceptedAt && (

                                        <small>

                                            Accepted at{" "}

                                            {
                                                formatDate(
                                                    selectedDonation.acceptedAt
                                                )
                                            }

                                        </small>

                                    )}

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            PICKUP STATUS
                        ================================================= */}

                        {selectedDonation.acceptedBy && (

                            <div className="donor-pickup-box">

                                <span>
                                    PICKUP STATUS
                                </span>

                                <strong>

                                    🚚{" "}

                                    {
                                        selectedDonation.pickupStatus ||
                                        "Pending Pickup"
                                    }

                                </strong>

                            </div>

                        )}


                        {/* =================================================
                            COMPLETED RESCUE
                        ================================================= */}

                        {selectedDonation.status ===
                            "Completed" && (

                            <div className="receiver-accepted-box">

                                <div className="accepted-box-icon">
                                    ✅
                                </div>

                                <div>

                                    <span>
                                        RESCUE STATUS
                                    </span>

                                    <strong>
                                        Food successfully rescued
                                    </strong>

                                    <small>
                                        This donation has been
                                        completed successfully.
                                    </small>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        {selectedDonation.description && (

                            <div className="modal-description">

                                <span>
                                    Description
                                </span>

                                <p>

                                    {
                                        selectedDonation.description
                                    }

                                </p>

                            </div>

                        )}


                        <button
                            className="dashboard-primary-btn modal-done-btn"
                            onClick={() =>
                                setSelectedDonation(null)
                            }
                        >
                            Done
                        </button>

                    </div>

                </div>

            )}

        </main>
    );
}

export default DonorDashboard;