import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="nav-logo">

                <span className="logo-icon">
                    ✦
                </span>

                <span>
                    TaskFlow
                </span>

            </div>


            {/* Navigation */}
            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/tasks">
                    My Tasks
                </Link>

            </div>

     </nav>
    );
}

export default Navbar;