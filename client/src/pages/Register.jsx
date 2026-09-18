import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    /* =====================================================
       HANDLE REGISTER
       ===================================================== */

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");


        /* =================================================
           CHECK ROLE
           ================================================= */

        if (!role) {

            setError("Please select a role.");

            return;
        }


        try {

            setLoading(true);


            /* =================================================
               SEND USER TO BACKEND
               ================================================= */

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role
                    })
                }
            );


            const data = await response.json();


            /* =================================================
               CHECK BACKEND RESPONSE
               ================================================= */

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Registration failed"
                );
            }


            /* =================================================
               REMOVE OLD LOCAL USER DATA
               ================================================= */

            localStorage.removeItem(
                "foodRescueUsers"
            );

            localStorage.removeItem(
                "foodRescueCurrentUser"
            );


            /* =================================================
               SHOW SUCCESS MESSAGE
               ================================================= */

            alert(
                "Account created successfully! 🎉"
            );


            /* =================================================
               GO TO LOGIN
               ================================================= */

            navigate("/login");


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setError(
                error.message ||
                "Unable to create account. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <main className="auth-page">

            <div className="auth-container register-container">


                <div className="auth-logo">
                    🍱 FoodRescue <span>AI</span>
                </div>


                <h1>
                    Join FoodRescue AI
                </h1>


                <p className="auth-subtitle">
                    Choose your role and start making an impact.
                </p>


                {/* =================================================
                    ERROR MESSAGE
                   ================================================= */}

                {error && (

                    <div className="dashboard-error">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handleRegister}
                >


                    {/* =================================================
                        FULL NAME
                       ================================================= */}

                    <label>
                        Full Name
                    </label>


                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    {/* =================================================
                        EMAIL
                       ================================================= */}

                    <label>
                        Email Address
                    </label>


                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    {/* =================================================
                        PASSWORD
                       ================================================= */}

                    <label>
                        Password
                    </label>


                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {/* =================================================
                        ROLE
                       ================================================= */}

                    <label>
                        I want to join as
                    </label>


                    <div className="role-options">


                        {/* DONOR */}

                        <button
                            type="button"
                            className={
                                role === "DONOR"
                                    ? "role-card selected"
                                    : "role-card"
                            }
                            onClick={() =>
                                setRole("DONOR")
                            }
                        >

                            <span>
                                🍱
                            </span>

                            <strong>
                                Donor
                            </strong>

                            <small>
                                Donate surplus food
                            </small>

                        </button>


                        {/* RECEIVER */}

                        <button
                            type="button"
                            className={
                                role === "RECEIVER"
                                    ? "role-card selected"
                                    : "role-card"
                            }
                            onClick={() =>
                                setRole("RECEIVER")
                            }
                        >

                            <span>
                                🤝
                            </span>

                            <strong>
                                Receiver
                            </strong>

                            <small>
                                Receive food donations
                            </small>

                        </button>

                    </div>


                    {/* =================================================
                        REGISTER BUTTON
                       ================================================= */}

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account →"
                        }

                    </button>

                </form>


                {/* =================================================
                    LOGIN LINK
                   ================================================= */}

                <p className="auth-bottom">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </p>


            </div>

        </main>
    );
}

export default Register;