import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        setError("");

        // Get registered users
        const users =
            JSON.parse(localStorage.getItem("foodRescueUsers")) || [];

        // Find matching user
        const user = users.find(
            (item) =>
                item.email === email &&
                item.password === password
        );

        // Incorrect login
        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        // Save logged-in user
        localStorage.setItem(
            "foodRescueCurrentUser",
            JSON.stringify(user)
        );

        // Redirect based on role
        if (user.role === "DONOR") {
            navigate("/donor-dashboard");
        } else if (user.role === "RECEIVER") {
            navigate("/receiver-dashboard");
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
                    >
                        Login →
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