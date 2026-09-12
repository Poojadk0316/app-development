function Welcome() {

    return (
        <div className="welcome-page">

            {/* Decorative background shapes */}
            <div className="welcome-circle circle-one"></div>
            <div className="welcome-circle circle-two"></div>


            {/* Main Welcome Content */}
            <div className="welcome-content">

                <div className="welcome-badge">
                    ✦ STUDENT TASK PORTAL
                </div>

                <h1>
                    Welcome to
                    <span> TaskFlow</span>
                </h1>

                <p className="welcome-description">
                    Organize your academic tasks, track your progress,
                    and stay focused on what matters most.
                </p>


                {/* Features */}
                <div className="welcome-features">

                    <div className="welcome-feature">
                        <div className="feature-icon">
                            📋
                        </div>

                        <div>
                            <h3>
                                Organize
                            </h3>

                            <p>
                                Keep all your tasks in one place.
                            </p>
                        </div>
                    </div>


                    <div className="welcome-feature">
                        <div className="feature-icon">
                            📊
                        </div>

                        <div>
                            <h3>
                                Track Progress
                            </h3>

                            <p>
                                See your progress at a glance.
                            </p>
                        </div>
                    </div>


                    <div className="welcome-feature">
                        <div className="feature-icon">
                            ✓
                        </div>

                        <div>
                            <h3>
                                Stay Productive
                            </h3>

                            <p>
                                Complete your tasks on time.
                            </p>
                        </div>
                    </div>

                </div>


                {/* Bottom Message */}
                <div className="welcome-message">
                    <span>✦</span>
                    Stay organized. Stay focused. Get things done.
                </div>

            </div>

        </div>
    );
}

export default Welcome;