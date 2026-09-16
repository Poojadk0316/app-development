
import { useState } from "react";

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


    /* =====================================================
       DEFAULT DONATIONS
       ===================================================== */

    const defaultDonations = [
        {
            id: 1,
            foodName: "Vegetable Rice & Curry",
            foodType: "Cooked Food",
            quantity: "12",
            quantityUnit: "kg",
            preparationTime: "Today, 4:00 PM",
            expiryTime: "Today, 10:00 PM",
            pickupStart: "Today, 7:00 PM",
            pickupEnd: "Today, 8:00 PM",
            location: "BTM Layout, Bengaluru",
            description:
                "Freshly prepared vegetarian rice and curry.",
            donorName: "Green Leaf Restaurant",
            status: "Available"
        },

        {
            id: 2,
            foodName: "Fresh Chapati & Dal",
            foodType: "Cooked Food",
            quantity: "8",
            quantityUnit: "kg",
            preparationTime: "Today, 5:00 PM",
            expiryTime: "Today, 11:00 PM",
            pickupStart: "Today, 8:30 PM",
            pickupEnd: "Today, 9:00 PM",
            location: "Jayanagar, Bengaluru",
            description:
                "Fresh chapati and dal from evening catering.",
            donorName: "Annapurna Caterers",
            status: "Accepted",

            /* Receiver information */

            acceptedBy: "FoodRescue Receiver",
            acceptedAt: "Today, 6:30 PM",
            pickupStatus: "Pending Pickup"
        },

        {
            id: 3,
            foodName: "Paneer Rice",
            foodType: "Cooked Food",
            quantity: "15",
            quantityUnit: "kg",
            preparationTime: "Yesterday, 6:00 PM",
            expiryTime: "Yesterday, 11:00 PM",
            pickupStart: "Yesterday, 7:00 PM",
            pickupEnd: "Yesterday, 8:00 PM",
            location: "Koramangala, Bengaluru",
            description:
                "Paneer rice from a completed event.",
            donorName: "Spice Garden",
            status: "Completed"
        }
    ];


    /* =====================================================
       LOAD DONATIONS
       ===================================================== */

    const [donations, setDonations] = useState(() => {

        const savedDonations =
            localStorage.getItem(
                "foodRescueDonations"
            );

        if (savedDonations) {
            return JSON.parse(savedDonations);
        }

        localStorage.setItem(
            "foodRescueDonations",
            JSON.stringify(defaultDonations)
        );

        return defaultDonations;
    });


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
       ADD DONATION
       ===================================================== */

    const handleAddDonation = (e) => {

        e.preventDefault();

        const newDonation = {

            id: Date.now(),

            foodName,
            foodType,

            quantity,
            quantityUnit,

            preparationTime,
            expiryTime,

            pickupStart,
            pickupEnd,

            location,
            description,

            donorName: currentUser.name,

            status: "Available"
        };


        const updatedDonations = [
            ...donations,
            newDonation
        ];


        setDonations(
            updatedDonations
        );


        localStorage.setItem(
            "foodRescueDonations",
            JSON.stringify(
                updatedDonations
            )
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
    };


    /* =====================================================
       STATISTICS
       ===================================================== */

    const activeDonations =
        donations.filter(
            (donation) =>
                donation.status === "Available" ||
                donation.status === "Accepted"
        ).length;


    const completedDonations =
        donations.filter(
            (donation) =>
                donation.status === "Completed"
        ).length;


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
                STATISTICS
               ================================================= */}

            <section className="dashboard-stats">


                {/* TOTAL DONATIONS */}

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


                {/* MEALS RESCUED */}

                <div className="dashboard-stat-card">

                    <div className="stat-icon orange">
                        🍽️
                    </div>

                    <div>

                        <span>
                            Meals Rescued
                        </span>

                        <strong>
                            35+
                        </strong>

                    </div>

                </div>


                {/* ACTIVE DONATIONS */}

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


                {/* COMPLETED */}

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


                            {/* FOOD NAME */}

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


                            {/* FOOD TYPE */}

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


                            {/* QUANTITY */}

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

                                    </select>

                                </div>

                            </div>


                            {/* PREPARATION TIME */}

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


                            {/* EXPIRY TIME */}

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


                            {/* PICKUP START */}

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


                            {/* PICKUP END */}

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


                            {/* LOCATION */}

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


                            {/* DESCRIPTION */}

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


                        {/* FORM BUTTONS */}

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
                DONATION LIST
               ================================================= */}

            <section className="donations-section">


                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            YOUR DONATIONS
                        </p>

                        <h2>
                            Recent Food Donations
                        </h2>

                    </div>


                    <span className="donation-count">

                        {donations.length}
                        {" "}
                        donations

                    </span>

                </div>


                <div className="donation-list">

                    {donations.map(
                        (donation) => (

                            <div
                                className="donation-row"
                                key={donation.id}
                            >


                                {/* FOOD ICON */}

                                <div className="donation-food-icon">
                                    🍲
                                </div>


                                {/* FOOD INFORMATION */}

                                <div className="donation-info">

                                    <h3>
                                        {donation.foodName}
                                    </h3>

                                    <p>
                                        Donation #{donation.id}
                                    </p>

                                </div>


                                {/* QUANTITY */}

                                <div className="donation-detail">

                                    <span>
                                        Quantity
                                    </span>

                                    <strong>
                                        {donation.quantity}{" "}
                                        {donation.quantityUnit}
                                    </strong>

                                </div>


                                {/* PICKUP */}

                                <div className="donation-detail">

                                    <span>
                                        Pickup
                                    </span>

                                    <strong>
                                        {donation.pickupStart}
                                    </strong>

                                </div>


                                {/* ACTIONS */}

                                <div className="donation-actions">

                                    <span
                                        className={`donation-status ${donation.status.toLowerCase()}`}
                                    >
                                        {donation.status}
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


                        {/* CLOSE BUTTON */}

                        <button
                            className="modal-close"
                            onClick={() =>
                                setSelectedDonation(null)
                            }
                        >
                            ✕
                        </button>


                        {/* FOOD ICON */}

                        <div className="modal-icon">
                            🍲
                        </div>


                        <p className="dashboard-label">
                            DONATION DETAILS
                        </p>


                        <h2>
                            {selectedDonation.foodName}
                        </h2>


                        <p className="modal-donor-name">

                            Donated by{" "}

                            <strong>
                                {selectedDonation.donorName}
                            </strong>

                        </p>


                        {/* =================================================
                            DONATION DETAILS
                           ================================================= */}

                        <div className="modal-details">


                            <div>

                                <span>
                                    Food Type
                                </span>

                                <strong>
                                    {selectedDonation.foodType}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Quantity
                                </span>

                                <strong>

                                    {selectedDonation.quantity}
                                    {" "}
                                    {selectedDonation.quantityUnit}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Preparation
                                </span>

                                <strong>
                                    {selectedDonation.preparationTime}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Expiry
                                </span>

                                <strong>
                                    {selectedDonation.expiryTime}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Pickup Start
                                </span>

                                <strong>
                                    {selectedDonation.pickupStart}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Pickup End
                                </span>

                                <strong>
                                    {selectedDonation.pickupEnd}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Location
                                </span>

                                <strong>
                                    {selectedDonation.location}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Status
                                </span>

                                <strong>
                                    {selectedDonation.status}
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
                                        {selectedDonation.acceptedBy}
                                    </strong>


                                    {selectedDonation.acceptedAt && (

                                        <small>
                                            Accepted at{" "}
                                            {selectedDonation.acceptedAt}
                                        </small>

                                    )}

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            PICKUP STATUS
                           ================================================= */}

                        {selectedDonation.pickupStatus && (

                            <div className="donor-pickup-box">

                                <span>
                                    PICKUP STATUS
                                </span>

                                <strong>
                                    🚚{" "}
                                    {selectedDonation.pickupStatus}
                                </strong>

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
                                    {selectedDonation.description}
                                </p>

                            </div>

                        )}


                        {/* DONE BUTTON */}

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

