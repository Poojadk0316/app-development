import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegister = (e) => {

        e.preventDefault();

        if (!role) {
            alert("Please select a role.");
            return;
        }

        // Get existing users
        const existingUsers =
            JSON.parse(localStorage.getItem("foodRescueUsers")) || [];

        // Check if email already exists
        const userExists = existingUsers.some(
            (user) => user.email === email
        );

        if (userExists) {
            alert("An account with this email already exists.");
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role
        };

        // Save user
        existingUsers.push(newUser);

        localStorage.setItem(
            "foodRescueUsers",
            JSON.stringify(existingUsers)
        );

        alert("Account created successfully! 🎉");

        // Go to login page
        navigate("/login");
    };

    return (
        <main className="auth-page">

            <div className="auth-container register-container">

                <div className="auth-logo">
                    🍱 FoodRescue <span>AI</span>
                </div>

                <h1>Join FoodRescue AI</h1>

                <p className="auth-subtitle">
                    Choose your role and start making an impact.
                </p>


                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />


                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />


                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />


                    <label>I want to join as</label>


                    <div className="role-options">

                        <button
                            type="button"
                            className={
                                role === "DONOR"
                                    ? "role-card selected"
                                    : "role-card"
                            }
                            onClick={() => setRole("DONOR")}
                        >

                            <span>🍱</span>

                            <strong>Donor</strong>

                            <small>
                                Donate surplus food
                            </small>

                        </button>


                        <button
                            type="button"
                            className={
                                role === "RECEIVER"
                                    ? "role-card selected"
                                    : "role-card"
                            }
                            onClick={() => setRole("RECEIVER")}
                        >

                            <span>🤝</span>

                            <strong>Receiver</strong>

                            <small>
                                Receive food donations
                            </small>

                        </button>

                    </div>


                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Create Account →
                    </button>

                </form>


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