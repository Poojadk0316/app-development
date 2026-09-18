import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Invalid email or password."
                );
            }


            // =========================================
            // SAVE USER DETAILS
            // =========================================

            const loggedInUser = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            };


            // =========================================
            // SAVE USER
            // =========================================

            localStorage.setItem(
                "foodRescueCurrentUser",
                JSON.stringify(loggedInUser)
            );


            // =========================================
            // SAVE JWT TOKEN
            // =========================================

            if (data.token) {

                localStorage.setItem(
                    "foodRescueToken",
                    data.token
                );

            }


            // =========================================
            // REDIRECT
            // =========================================

            if (
                loggedInUser.role ===
                "DONOR"
            ) {

                navigate(
                    "/donor-dashboard"
                );

            } else if (
                loggedInUser.role ===
                "RECEIVER"
            ) {

                navigate(
                    "/receiver-dashboard"
                );

            } else {

                navigate("/");

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                error.message ||
                "Unable to login. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <main className="auth-page">

            <div className="auth-container">

                <div className="auth-logo">
                    🍱 FoodRescue <span>AI</span>
                </div>


                <h1>
                    Welcome Back
                </h1>


                <p className="auth-subtitle">
                    Login to continue making an impact.
                </p>


                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleLogin}>

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


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login →"}
                    </button>

                </form>


                <p className="auth-bottom">

                    Don't have an account?

                    <Link to="/register">
                        {" "}Create one
                    </Link>

                </p>

            </div>

        </main>
    );
}

export default Login;