
import { useState } from "react";

function ReceiverDashboard() {

    const currentUser =
        JSON.parse(
            localStorage.getItem("foodRescueCurrentUser")
        ) || {
            name: "FoodRescue Receiver",
            role: "RECEIVER"
        };

    const defaultDonations = [
        {
            id: 1,
            foodName: "Vegetable Rice & Curry",
            foodType: "Cooked Food",
            quantity: "12",
            quantityUnit: "kg",
            donorName: "Green Leaf Restaurant",
            distance: "2.4 km",
            pickupStart: "Today, 8:00 PM",
            pickupEnd: "Today, 9:00 PM",
            location: "BTM Layout, Bengaluru",
            expiryTime: "Today, 10:00 PM",
            description:
                "Freshly prepared vegetarian rice and curry.",
            status: "Available"
        },
        {
            id: 2,
            foodName: "Fresh Chapati & Dal",
            foodType: "Cooked Food",
            quantity: "8",
            quantityUnit: "kg",
            donorName: "Annapurna Caterers",
            distance: "3.1 km",
            pickupStart: "Today, 9:00 PM",
            pickupEnd: "Today, 10:00 PM",
            location: "Jayanagar, Bengaluru",
            expiryTime: "Today, 11:00 PM",
            description:
                "Fresh chapati and dal from evening catering.",
            status: "Available"
        },
        {
            id: 3,
            foodName: "Paneer Rice",
            foodType: "Cooked Food",
            quantity: "15",
            quantityUnit: "kg",
            donorName: "Spice Garden",
            distance: "4.2 km",
            pickupStart: "Today, 7:30 PM",
            pickupEnd: "Today, 8:30 PM",
            location: "Koramangala, Bengaluru",
            expiryTime: "Today, 11:00 PM",
            description:
                "Paneer rice from a completed event.",
            status: "Available"
        }
    ];

    const [donations, setDonations] = useState(() => {

        const savedDonations =
            localStorage.getItem("foodRescueDonations");

        if (savedDonations) {
            return JSON.parse(savedDonations);
        }

        localStorage.setItem(
            "foodRescueDonations",
            JSON.stringify(defaultDonations)
        );

        return defaultDonations;
    });

    const [selectedDonation, setSelectedDonation] =
        useState(null);

    const handleAccept = (id) => {

        const updatedDonations =
            donations.map((donation) => {

                if (donation.id === id) {

                    return {
                        ...donation,
                        status: "Accepted",
                        acceptedBy: currentUser.name,
                        acceptedAt: new Date().toLocaleString(),
                        pickupStatus: "Pending Pickup"
                    };
                }

                return donation;
            });

        setDonations(updatedDonations);

        localStorage.setItem(
            "foodRescueDonations",
            JSON.stringify(updatedDonations)
        );

        setSelectedDonation(null);

        alert(
            "Donation accepted successfully! 🤝\nPickup details have been saved."
        );
    };

    const availableDonations =
        donations.filter(
            (donation) =>
                donation.status === "Available"
        );

    const acceptedDonations =
        donations.filter(
            (donation) =>
                donation.status === "Accepted" &&
                donation.acceptedBy === currentUser.name
        );

    const completedCount =
        donations.filter(
            (donation) =>
                donation.status === "Completed"
        ).length;

    return (

        <main className="receiver-dashboard">

            {/* HEADER */}

            <section className="receiver-header">

                <div>

                    <p className="dashboard-label">
                        RECEIVER DASHBOARD
                    </p>

                    <h1>
                        Find Food Near You 🤝
                    </h1>

                    <p>
                        Discover available surplus food and help
                        bring nutritious meals to your community.
                    </p>

                </div>

                <div className="receiver-location">
                    📍 <span>Nearby Donations</span>
                </div>

            </section>


            {/* STATS */}

            <section className="dashboard-stats">

                <div className="dashboard-stat-card">

                    <div className="stat-icon green">
                        🍱
                    </div>

                    <div>
                        <span>Available Food</span>
                        <strong>
                            {availableDonations.length}
                        </strong>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon blue">
                        🤝
                    </div>

                    <div>
                        <span>My Accepted</span>
                        <strong>
                            {acceptedDonations.length}
                        </strong>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon purple">
                        ✅
                    </div>

                    <div>
                        <span>Completed</span>
                        <strong>
                            {completedCount}
                        </strong>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon orange">
                        🍽️
                    </div>

                    <div>
                        <span>Meals Received</span>
                        <strong>180+</strong>
                    </div>

                </div>

            </section>


            {/* AVAILABLE DONATIONS */}

            <section className="receiver-donations">

                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            NEARBY FOOD
                        </p>

                        <h2>
                            Available Donations
                        </h2>

                    </div>

                    <span className="donation-count">
                        {availableDonations.length} available
                    </span>

                </div>


                <div className="receiver-donation-list">

                    {availableDonations.length === 0 ? (

                        <div className="empty-donations">

                            <div>
                                🍱
                            </div>

                            <h3>
                                No food available right now
                            </h3>

                            <p>
                                New donations will appear here when
                                donors post surplus food.
                            </p>

                        </div>

                    ) : (

                        availableDonations.map(
                            (donation) => (

                                <div
                                    className="receiver-donation-card"
                                    key={donation.id}
                                >

                                    <div className="receiver-food-icon">
                                        🍲
                                    </div>


                                    <div className="receiver-food-info">

                                        <h3>
                                            {donation.foodName}
                                        </h3>

                                        <p>
                                            Donated by{" "}
                                            <strong>
                                                {donation.donorName ||
                                                    "FoodRescue Donor"}
                                            </strong>
                                        </p>


                                        <div className="receiver-meta">

                                            <span>
                                                📦{" "}
                                                {donation.quantity}{" "}
                                                {donation.quantityUnit}
                                            </span>

                                            <span>
                                                📍{" "}
                                                {donation.distance ||
                                                    "Nearby"}
                                            </span>

                                            <span>
                                                ⏰{" "}
                                                {donation.pickupStart ||
                                                    "Pickup available"}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="receiver-actions">

                                        <span className="donation-status available">
                                            Available
                                        </span>

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                setSelectedDonation(
                                                    donation
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                        <button
                                            className="accept-btn"
                                            onClick={() =>
                                                handleAccept(
                                                    donation.id
                                                )
                                            }
                                        >
                                            Accept →
                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </section>


            {/* MY ACCEPTED DONATIONS */}

            <section className="receiver-donations accepted-section">

                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            MY RESCUES
                        </p>

                        <h2>
                            My Accepted Donations
                        </h2>

                    </div>

                    <span className="donation-count">
                        {acceptedDonations.length} accepted
                    </span>

                </div>


                <div className="receiver-donation-list">

                    {acceptedDonations.length === 0 ? (

                        <div className="empty-donations">

                            <div>
                                🤝
                            </div>

                            <h3>
                                No accepted donations yet
                            </h3>

                            <p>
                                Accept a food donation above and it
                                will appear here with pickup details.
                            </p>

                        </div>

                    ) : (

                        acceptedDonations.map(
                            (donation) => (

                                <div
                                    className="accepted-donation-card"
                                    key={donation.id}
                                >

                                    <div className="receiver-food-icon">
                                        🍱
                                    </div>


                                    <div className="receiver-food-info">

                                        <h3>
                                            {donation.foodName}
                                        </h3>

                                        <p>
                                            From{" "}
                                            <strong>
                                                {donation.donorName}
                                            </strong>
                                        </p>


                                        <div className="receiver-meta">

                                            <span>
                                                📦{" "}
                                                {donation.quantity}{" "}
                                                {donation.quantityUnit}
                                            </span>

                                            <span>
                                                📍{" "}
                                                {donation.location}
                                            </span>

                                            <span>
                                                ⏰{" "}
                                                {donation.pickupStart}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="receiver-actions">

                                        <span className="donation-status accepted">
                                            Accepted
                                        </span>

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                setSelectedDonation(
                                                    donation
                                                )
                                            }
                                        >
                                            Pickup Details
                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </section>


            {/* DETAILS MODAL */}

            {selectedDonation && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setSelectedDonation(null)
                    }
                >

                    <div
                        className="donation-modal"
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
                            {selectedDonation.foodName}
                        </h2>


                        <p>
                            Donated by{" "}
                            <strong>
                                {selectedDonation.donorName ||
                                    "FoodRescue Donor"}
                            </strong>
                        </p>


                        <div className="modal-details">

                            <div>
                                <span>Food Type</span>
                                <strong>
                                    {selectedDonation.foodType}
                                </strong>
                            </div>


                            <div>
                                <span>Quantity</span>
                                <strong>
                                    {selectedDonation.quantity}{" "}
                                    {selectedDonation.quantityUnit}
                                </strong>
                            </div>


                            <div>
                                <span>Pickup Start</span>
                                <strong>
                                    {selectedDonation.pickupStart}
                                </strong>
                            </div>


                            <div>
                                <span>Pickup End</span>
                                <strong>
                                    {selectedDonation.pickupEnd}
                                </strong>
                            </div>


                            <div>
                                <span>Location</span>
                                <strong>
                                    {selectedDonation.location ||
                                        "Nearby"}
                                </strong>
                            </div>


                            <div>
                                <span>Expiry</span>
                                <strong>
                                    {selectedDonation.expiryTime ||
                                        "Not specified"}
                                </strong>
                            </div>


                            <div>
                                <span>Status</span>
                                <strong>
                                    {selectedDonation.status}
                                </strong>
                            </div>


                            {selectedDonation.acceptedBy && (

                                <div>
                                    <span>Accepted By</span>
                                    <strong>
                                        {selectedDonation.acceptedBy}
                                    </strong>
                                </div>

                            )}

                        </div>


                        {selectedDonation.acceptedAt && (

                            <div className="modal-description">

                                <span>Accepted At</span>

                                <p>
                                    {selectedDonation.acceptedAt}
                                </p>

                            </div>

                        )}


                        {selectedDonation.pickupStatus && (

                            <div className="pickup-status-box">

                                <span>
                                    PICKUP STATUS
                                </span>

                                <strong>
                                    🚚{" "}
                                    {selectedDonation.pickupStatus}
                                </strong>

                            </div>

                        )}


                        {selectedDonation.description && (

                            <div className="modal-description">

                                <span>Description</span>

                                <p>
                                    {selectedDonation.description}
                                </p>

                            </div>

                        )}


                        {selectedDonation.status ===
                            "Available" && (

                            <button
                                className="accept-btn modal-accept"
                                onClick={() =>
                                    handleAccept(
                                        selectedDonation.id
                                    )
                                }
                            >
                                Accept Donation →
                            </button>

                        )}


                        {selectedDonation.status ===
                            "Accepted" && (

                            <button
                                className="dashboard-primary-btn modal-done-btn"
                                onClick={() =>
                                    setSelectedDonation(null)
                                }
                            >
                                Pickup Details Saved ✓
                            </button>

                        )}

                    </div>

                </div>

            )}

        </main>
    );
}

export default ReceiverDashboard;

