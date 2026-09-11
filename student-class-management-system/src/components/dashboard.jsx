import { useNavigate } from "react-router-dom";

function Dashboard({ tasks }) {

    const navigate = useNavigate();

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    return (

        <div className="dashboard-page">

            <div className="dashboard-header">

                <h1>
                    Welcome Back! 
                </h1>

                <p>
                    Here's an overview of your tasks
                </p>

            </div>


            <div className="dashboard-stats">

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


                <div className="stat-card">

                    <div className="stat-icon">
                        ✅
                    </div>

                    <h3>
                        Completed
                    </h3>

                    <h2>
                        {completedTasks}
                    </h2>

                </div>

            </div>


            <div className="dashboard-action">

                <h2>
                    Manage Your Tasks
                </h2>

                <p>
                    Add new tasks, update their status and keep track of your progress.
                </p>

                <button
                    type="button"
                    className="view-tasks-btn"
                    onClick={() => navigate("/tasks")}
                >
                    View All Tasks →
                </button>

            </div>

        </div>

    );
}

export default Dashboard;