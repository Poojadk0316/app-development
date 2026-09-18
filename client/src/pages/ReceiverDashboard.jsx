import { useEffect, useState } from "react";

function ReceiverDashboard() {

    const currentUser =
        JSON.parse(
            localStorage.getItem("foodRescueCurrentUser")
        ) || {
            name: "FoodRescue Receiver",
            role: "RECEIVER"
        };

    const currentUserId =
        currentUser.id ||
        currentUser._id ||
        null;


    const [donations, setDonations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [selectedDonation, setSelectedDonation] =
        useState(null);

    const [updatingDonationId, setUpdatingDonationId] =
        useState(null);


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
       FETCH DONATIONS
    ===================================================== */

    const fetchDonations = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/donations"
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch donations"
                );
            }

            setDonations(data);
            setError("");

        } catch (error) {

            console.error(
                "Fetch donations error:",
                error
            );

            setError(
                error.message ||
                "Unable to load donations."
            );

        } finally {

            setLoading(false);

        }
    };


    /* =====================================================
       LOAD DONATIONS
    ===================================================== */

    useEffect(() => {

        fetchDonations();

        const interval =
            setInterval(
                fetchDonations,
                5000
            );

        return () => {
            clearInterval(interval);
        };

    }, []);


    /* =====================================================
       ACCEPT DONATION
    ===================================================== */

    const handleAccept = async (donationId) => {

        try {

            if (!currentUserId) {

                setError(
                    "Receiver ID not found. Please logout and login again."
                );

                return;
            }

            setUpdatingDonationId(
                donationId
            );

            setError("");


            const response = await fetch(
                `http://localhost:5000/api/donations/${donationId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        status: "Accepted",

                        acceptedBy:
                            currentUserId,

                        acceptedAt:
                            new Date().toISOString(),

                        pickupStatus:
                            "Pending Pickup"

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to accept donation"
                );
            }


            setDonations(
                (previous) =>
                    previous.map(
                        (donation) =>
                            donation._id ===
                            donationId
                                ? data.donation
                                : donation
                    )
            );


            setSelectedDonation(
                data.donation
            );


        } catch (error) {

            console.error(
                "Accept donation error:",
                error
            );

            setError(
                error.message ||
                "Failed to accept donation"
            );

        } finally {

            setUpdatingDonationId(
                null
            );

        }
    };


    /* =====================================================
       UPDATE PICKUP STATUS
    ===================================================== */

    const updatePickupStatus = async (
        donation,
        status,
        pickupStatus
    ) => {

        try {

            setUpdatingDonationId(
                donation._id
            );

            setError("");


            const acceptedById =
                typeof donation.acceptedBy ===
                "object"
                    ? donation.acceptedBy?._id ||
                      donation.acceptedBy?.id
                    : donation.acceptedBy;


            const response = await fetch(
                `http://localhost:5000/api/donations/${donation._id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        status,

                        acceptedBy:
                            acceptedById,

                        acceptedAt:
                            donation.acceptedAt,

                        pickupStatus

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update donation"
                );
            }


            setDonations(
                (previous) =>
                    previous.map(
                        (item) =>
                            item._id ===
                            donation._id
                                ? data.donation
                                : item
                    )
            );


            setSelectedDonation(
                data.donation
            );


        } catch (error) {

            console.error(
                "Pickup update error:",
                error
            );

            setError(
                error.message ||
                "Failed to update pickup status"
            );

        } finally {

            setUpdatingDonationId(
                null
            );

        }
    };


    /* =====================================================
       CURRENT RECEIVER CHECK
    ===================================================== */

    const isMyDonation = (
        donation
    ) => {

        if (!donation.acceptedBy) {
            return false;
        }


        const acceptedId =
            typeof donation.acceptedBy ===
            "object"
                ? donation.acceptedBy?._id ||
                  donation.acceptedBy?.id
                : donation.acceptedBy;


        return (
            currentUserId &&
            String(acceptedId) ===
            String(currentUserId)
        );
    };


    /* =====================================================
       AVAILABLE
    ===================================================== */

    const availableDonations =
        donations.filter(
            (donation) =>
                donation.status ===
                "Available"
        );


    /* =====================================================
       ACTIVE
    ===================================================== */

    const activeRescues =
        donations.filter(
            (donation) =>
                isMyDonation(donation) &&
                [
                    "Accepted",
                    "Pickup Assigned",
                    "Picked Up"
                ].includes(
                    donation.status
                )
        );


    /* =====================================================
       COMPLETED
    ===================================================== */

    const completedRescues =
        donations.filter(
            (donation) =>
                isMyDonation(donation) &&
                donation.status ===
                "Completed"
        );


    /* =====================================================
       MEALS RECEIVED
    ===================================================== */

    const mealsReceived =
        completedRescues.reduce(
            (total, donation) =>
                total +
                (Number(
                    donation.quantity
                ) || 0),
            0
        );


    const receivedUnits =
        [
            ...new Set(
                completedRescues
                    .map(
                        (donation) =>
                            donation.quantityUnit
                    )
                    .filter(Boolean)
            )
        ];


    const mealsReceivedDisplay =
        completedRescues.length === 0
            ? "0"
            : receivedUnits.length === 1
                ? `${mealsReceived} ${receivedUnits[0]}`
                : `${mealsReceived}`;


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    const getStatusClass = (
        status
    ) => {

        if (!status) {
            return "";
        }

        return status
            .toLowerCase()
            .replace(/\s+/g, "-");
    };


    /* =====================================================
       PICKUP BUTTON
    ===================================================== */

    const getPickupButton = (
        donation
    ) => {

        const updating =
            updatingDonationId ===
            donation._id;


        if (
            donation.status ===
            "Accepted"
        ) {

            return (

                <button
                    className="accept-btn"
                    disabled={updating}
                    onClick={() =>
                        updatePickupStatus(
                            donation,
                            "Pickup Assigned",
                            "Pickup Assigned"
                        )
                    }
                >
                    {updating
                        ? "Updating..."
                        : "Assign Pickup →"}
                </button>

            );
        }


        if (
            donation.status ===
            "Pickup Assigned"
        ) {

            return (

                <button
                    className="accept-btn"
                    disabled={updating}
                    onClick={() =>
                        updatePickupStatus(
                            donation,
                            "Picked Up",
                            "Picked Up"
                        )
                    }
                >
                    {updating
                        ? "Updating..."
                        : "Mark Picked Up →"}
                </button>

            );
        }


        if (
            donation.status ===
            "Picked Up"
        ) {

            return (

                <button
                    className="accept-btn"
                    disabled={updating}
                    onClick={() =>
                        updatePickupStatus(
                            donation,
                            "Completed",
                            "Completed"
                        )
                    }
                >
                    {updating
                        ? "Updating..."
                        : "Mark Completed →"}
                </button>

            );
        }


        return null;
    };


    /* =====================================================
       RETURN
    ===================================================== */

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
                        Discover available surplus food and
                        help bring nutritious meals to your
                        community.
                    </p>

                </div>


                <div className="receiver-location">
                    📍 <span>Nearby Donations</span>
                </div>

            </section>


            {/* ERROR */}

            {error && (

                <div className="dashboard-error">
                    {error}
                </div>

            )}


            {/* STATS */}

            <section className="dashboard-stats">


                <div className="dashboard-stat-card">

                    <div className="stat-icon green">
                        🍱
                    </div>

                    <div>

                        <span>
                            Available Food
                        </span>

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

                        <span>
                            My Active Rescues
                        </span>

                        <strong>
                            {activeRescues.length}
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
                            {completedRescues.length}
                        </strong>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon orange">
                        🍽️
                    </div>

                    <div>

                        <span>
                            Meals Received
                        </span>

                        <strong>
                            {mealsReceivedDisplay}
                        </strong>

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


                    {loading && (

                        <div className="empty-donations">

                            <div>
                                🍱
                            </div>

                            <h3>
                                Loading available food...
                            </h3>

                        </div>

                    )}


                    {!loading &&
                        availableDonations.length === 0 && (

                            <div className="empty-donations">

                                <div>
                                    🍱
                                </div>

                                <h3>
                                    No food available right now
                                </h3>

                                <p>
                                    New donations will appear
                                    here when donors post surplus
                                    food.
                                </p>

                            </div>

                        )}


                    {!loading &&
                        availableDonations.map(
                            (donation) => (

                                <div
                                    className="receiver-donation-card"
                                    key={donation._id}
                                >

                                    <div className="receiver-food-icon">
                                        🍲
                                    </div>


                                    <div className="receiver-food-info">

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>
                                            Donated by{" "}
                                            <strong>
                                                {
                                                    donation.donorName ||
                                                    "FoodRescue Donor"
                                                }
                                            </strong>
                                        </p>


                                        <div className="receiver-meta">

                                            <span>
                                                📦{" "}
                                                {
                                                    donation.quantity
                                                }{" "}
                                                {
                                                    donation.quantityUnit
                                                }
                                            </span>


                                            <span>
                                                📍{" "}
                                                {
                                                    donation.location ||
                                                    "Nearby"
                                                }
                                            </span>


                                            <span>
                                                ⏰{" "}
                                                {
                                                    formatDate(
                                                        donation.pickupStart
                                                    )
                                                }
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
                                            disabled={
                                                updatingDonationId ===
                                                donation._id
                                            }
                                            onClick={() =>
                                                handleAccept(
                                                    donation._id
                                                )
                                            }
                                        >
                                            {updatingDonationId ===
                                            donation._id
                                                ? "Accepting..."
                                                : "Accept →"}
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                </div>

            </section>


            {/* ACTIVE RESCUES */}

            <section className="receiver-donations accepted-section">

                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            MY RESCUES
                        </p>

                        <h2>
                            My Active Rescues
                        </h2>

                    </div>


                    <span className="donation-count">
                        {activeRescues.length} active
                    </span>

                </div>


                <div className="receiver-donation-list">

                    {activeRescues.length === 0 ? (

                        <div className="empty-donations">

                            <div>
                                🤝
                            </div>

                            <h3>
                                No active rescues yet
                            </h3>

                            <p>
                                Accept a food donation above and
                                it will appear here.
                            </p>

                        </div>

                    ) : (

                        activeRescues.map(
                            (donation) => (

                                <div
                                    className="accepted-donation-card"
                                    key={donation._id}
                                >

                                    <div className="receiver-food-icon">
                                        🍱
                                    </div>


                                    <div className="receiver-food-info">

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>
                                            From{" "}
                                            <strong>
                                                {
                                                    donation.donorName
                                                }
                                            </strong>
                                        </p>


                                        <div className="receiver-meta">

                                            <span>
                                                📦{" "}
                                                {
                                                    donation.quantity
                                                }{" "}
                                                {
                                                    donation.quantityUnit
                                                }
                                            </span>


                                            <span>
                                                📍{" "}
                                                {
                                                    donation.location
                                                }
                                            </span>


                                            <span>
                                                ⏰{" "}
                                                {
                                                    formatDate(
                                                        donation.pickupStart
                                                    )
                                                }
                                            </span>

                                        </div>

                                    </div>


                                    <div className="receiver-actions">

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
                                            Pickup Details
                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </section>


            {/* COMPLETED */}

            <section className="receiver-donations accepted-section">

                <div className="section-top">

                    <div>

                        <p className="dashboard-label">
                            RESCUE HISTORY
                        </p>

                        <h2>
                            Completed Rescues
                        </h2>

                    </div>


                    <span className="donation-count">
                        {completedRescues.length} completed
                    </span>

                </div>


                <div className="receiver-donation-list">

                    {completedRescues.length === 0 ? (

                        <div className="empty-donations">

                            <div>
                                ✅
                            </div>

                            <h3>
                                No completed rescues yet
                            </h3>

                            <p>
                                Completed food rescues will
                                appear here.
                            </p>

                        </div>

                    ) : (

                        completedRescues.map(
                            (donation) => (

                                <div
                                    className="accepted-donation-card"
                                    key={donation._id}
                                >

                                    <div className="receiver-food-icon">
                                        ✅
                                    </div>


                                    <div className="receiver-food-info">

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>
                                            From{" "}
                                            <strong>
                                                {
                                                    donation.donorName
                                                }
                                            </strong>
                                        </p>


                                        <div className="receiver-meta">

                                            <span>
                                                📦{" "}
                                                {
                                                    donation.quantity
                                                }{" "}
                                                {
                                                    donation.quantityUnit
                                                }
                                            </span>


                                            <span>
                                                📍{" "}
                                                {
                                                    donation.location
                                                }
                                            </span>


                                            <span>
                                                ✅ Completed
                                            </span>

                                        </div>

                                    </div>


                                    <div className="receiver-actions">

                                        <span className="donation-status completed">
                                            Completed
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
                        )

                    )}

                </div>

            </section>


            {/* MODAL */}

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
                            {
                                selectedDonation.foodName
                            }
                        </h2>


                        <p>
                            Donated by{" "}
                            <strong>
                                {
                                    selectedDonation.donorName ||
                                    "FoodRescue Donor"
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
                                        selectedDonation.location ||
                                        "Nearby"
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
                                    Status
                                </span>

                                <strong>
                                    {
                                        selectedDonation.status
                                    }
                                </strong>

                            </div>


                        </div>


                        {selectedDonation.acceptedAt && (

                            <div className="modal-description">

                                <span>
                                    Accepted At
                                </span>

                                <p>
                                    {
                                        formatDate(
                                            selectedDonation.acceptedAt
                                        )
                                    }
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
                                    {
                                        selectedDonation.pickupStatus
                                    }
                                </strong>

                            </div>

                        )}


                        {/* PICKUP */}

                        {[
                            "Accepted",
                            "Pickup Assigned",
                            "Picked Up"
                        ].includes(
                            selectedDonation.status
                        ) && (

                            <div className="pickup-action-area">

                                {getPickupButton(
                                    selectedDonation
                                )}

                            </div>

                        )}


                        {/* AVAILABLE */}

                        {selectedDonation.status ===
                            "Available" && (

                            <button
                                className="accept-btn modal-accept"
                                disabled={
                                    updatingDonationId ===
                                    selectedDonation._id
                                }
                                onClick={() =>
                                    handleAccept(
                                        selectedDonation._id
                                    )
                                }
                            >
                                {updatingDonationId ===
                                selectedDonation._id
                                    ? "Accepting..."
                                    : "Accept Donation →"}
                            </button>

                        )}


                        {/* COMPLETED */}

                        {selectedDonation.status ===
                            "Completed" && (

                            <button
                                className="dashboard-primary-btn modal-done-btn"
                                onClick={() =>
                                    setSelectedDonation(
                                        null
                                    )
                                }
                            >
                                Rescue Completed ✓
                            </button>

                        )}


                        {/* DESCRIPTION */}

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

                    </div>

                </div>

            )}

        </main>
    );
}

export default ReceiverDashboard;