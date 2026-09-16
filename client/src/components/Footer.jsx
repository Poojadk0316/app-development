function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-brand">
                    <h2>🍱 FoodRescue AI</h2>

                    <p>
                        Connecting surplus food with people who need it.
                        Together, we can reduce food waste and make a difference.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Platform</h3>

                    <a href="#how-it-works">How It Works</a>
                    <a href="#about">About Us</a>
                    <a href="/login">Login</a>
                </div>

                <div className="footer-links">
                    <h3>Get Involved</h3>

                    <a href="/register">Become a Donor</a>
                    <a href="/register">Become a Receiver</a>
                    <a href="/register">Volunteer</a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © 2026 FoodRescue AI. Built for a better tomorrow.
                </p>
            </div>

        </footer>
    );
}

export default Footer;