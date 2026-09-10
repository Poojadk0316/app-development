function Navbar() {
    return (
        <nav className="navbar">

            <div className="welcome-text">
                
                <a href="/">Welcome Student!!</a>
            </div>

            <div className="nav-links">
                <a href="/">Tasks</a>
                <a href="/">home</a>
                <a href="/students">Dashboard</a>
            </div>

        </nav>
    );
}

export default Navbar;
