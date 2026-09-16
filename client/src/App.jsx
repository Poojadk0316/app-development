import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* HOME PAGE */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* LOGIN PAGE */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* REGISTER PAGE */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* DONOR DASHBOARD */}
                <Route
                    path="/donor-dashboard"
                    element={<DonorDashboard />}
                />

                {/* RECEIVER DASHBOARD */}
                <Route
                    path="/receiver-dashboard"
                    element={<ReceiverDashboard />}
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;