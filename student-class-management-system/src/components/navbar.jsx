import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="welcome-text">
                Student Task Manager
            </div>

            <div className="nav-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/tasks">
                    Tasks
                </Link>

            </div>

        </nav>

    );
}

export default Navbar;