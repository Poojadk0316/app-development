import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <main>

            {/* ================= HERO ================= */}

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        🌱 Fighting Food Waste with Technology
                    </div>

                    <h1>
                        Surplus Food.
                        <br />
                        <span>Smarter Connections.</span>
                    </h1>

                    <p>
                        FoodRescue AI connects restaurants, hotels, events and
                        individuals with nearby NGOs and communities that need
                        surplus food — before it goes to waste.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-btn"
                        >
                            Start Rescuing Food →
                        </Link>

                        <a
                            href="#how-it-works"
                            className="secondary-btn"
                        >
                            Learn How It Works
                        </a>

                    </div>


                    {/* ================= STATS ================= */}

                    <div className="hero-stats">

                        <div className="stat-item">
                            <strong>10K+</strong>
                            <span>Meals Rescued</span>
                        </div>

                        <div className="stat-item">
                            <strong>500+</strong>
                            <span>Food Donors</span>
                        </div>

                        <div className="stat-item">
                            <strong>150+</strong>
                            <span>Organizations</span>
                        </div>

                    </div>

                </div>


                {/* ================= HERO VISUAL ================= */}

                <div className="hero-visual">

                    <div className="glow"></div>

                    <div className="hero-circle">
                        🍱
                    </div>


                    {/* FOOD CARD */}

                    <div
                        className="food-card main-card"
                        onClick={() => setShowDetails(!showDetails)}
                    >

                        <div className="food-icon">
                            🍲
                        </div>

                        <div className="food-info">

                            <h3>
                                Fresh Meals Available
                            </h3>

                            <p>
                                12 kg • Ready for pickup
                            </p>

                        </div>

                        <div className="available-dot"></div>

                    </div>


                    {/* EXTRA DETAILS */}

                    {showDetails && (

                        <div className="food-details">

                            <h4>Donation Details</h4>

                            <p>
                                🍚 Food Type: Cooked Meals
                            </p>

                            <p>
                                📦 Quantity: 12 kg
                            </p>

                            <p>
                                ⏰ Pickup within: 2 hours
                            </p>

                            <p>
                                📍 Distance: 2.4 km
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(false);
                                }}
                            >
                                Close
                            </button>

                        </div>

                    )}


                    {/* LOCATION */}

                    <div className="floating-card location-card">
                        📍 <span>2.4 km away</span>
                    </div>


                    {/* RESCUE */}

                    <div className="floating-card rescue-card">
                        ♻️ <span>Food Rescued</span>
                    </div>

                </div>

            </section>


            {/* ================= PROBLEM ================= */}

            <section
                className="problem-section"
                id="about"
            >

                <div className="section-heading">

                    <span>THE PROBLEM</span>

                    <h2>
                        Good food shouldn't become
                        <br />
                        <span>waste.</span>
                    </h2>

                    <p>
                        Every day, perfectly edible food is thrown away while
                        communities struggle to access nutritious meals.
                    </p>

                </div>


                <div className="problem-cards">

                    <div className="problem-card">

                        <div className="problem-icon">
                            🍽️
                        </div>

                        <h3>Food Surplus</h3>

                        <p>
                            Restaurants and events often have perfectly good
                            food left over at the end of the day.
                        </p>

                    </div>


                    <div className="problem-card">

                        <div className="problem-icon">
                            ⏰
                        </div>

                        <h3>Limited Time</h3>

                        <p>
                            Surplus food has a short usable window and needs
                            to reach someone quickly.
                        </p>

                    </div>


                    <div className="problem-card">

                        <div className="problem-icon">
                            🔗
                        </div>

                        <h3>Missing Connection</h3>

                        <p>
                            Donors and organizations often don't have an easy
                            way to find each other.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section
                className="how-section"
                id="how-it-works"
            >

                <div className="section-heading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        From surplus to
                        <br />
                        <span>someone's plate.</span>
                    </h2>

                </div>


                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <div className="step-icon">
                            📦
                        </div>

                        <h3>
                            Post Surplus Food
                        </h3>

                        <p>
                            Donors add information about available surplus
                            food, quantity and pickup time.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <div className="step-icon">
                            🤖
                        </div>

                        <h3>
                            AI Finds a Match
                        </h3>

                        <p>
                            Our intelligent system considers distance,
                            quantity, food type and availability.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <div className="step-icon">
                            🤝
                        </div>

                        <h3>
                            Connect & Rescue
                        </h3>

                        <p>
                            The receiver accepts the donation and coordinates
                            pickup with the donor.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="cta-section">

                <div className="cta-content">

                    <span>MAKE AN IMPACT</span>

                    <h2>
                        One meal can make
                        <br />
                        <strong>a difference.</strong>
                    </h2>

                    <p>
                        Whether you have food to donate or need food for your
                        community, FoodRescue AI helps you make the connection.
                    </p>

                    <Link
                        to="/register"
                        className="primary-btn"
                    >
                        Join FoodRescue AI →
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;