function Dashboard({ tasks }) {

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    return (
        <div className="dashboard-page">

            {/* Dashboard Heading */}
            <div className="dashboard-header">

                <p className="page-label">
                    DASHBOARD
                </p>

                <h1>
                    Task Dashboard
                </h1>

                <p>
                    Track your task progress at a glance.
                </p>

            </div>


            {/* Statistics */}
            <div className="dashboard-stats">

                {/* Total */}
                <div className="stat-card">

                    <div className="stat-icon">
                        📋
                    </div>

                    <h3>
                        Total Tasks
                    </h3>

                    <h2>
                        {totalTasks}
                    </h2>

                </div>


                {/* Pending */}
                <div className="stat-card">

                    <div className="stat-icon">
                        ⏳
                    </div>

                    <h3>
                        Pending
                    </h3>

                    <h2>
                        {pendingTasks}
                    </h2>

                </div>


                {/* In Progress */}
                <div className="stat-card">

                    <div className="stat-icon">
                        🔄
                    </div>

                    <h3>
                        In Progress
                    </h3>

                    <h2>
                        {inProgressTasks}
                    </h2>

                </div>


                {/* Completed */}
                <div className="stat-card">

                    <div className="stat-icon">
                        ✓
                    </div>

                    <h3>
                        Completed
                    </h3>

                    <h2>
                        {completedTasks}
                    </h2>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;