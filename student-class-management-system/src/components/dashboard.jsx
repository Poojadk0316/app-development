import Startcard from "./startcard";
import TaskCard from "./taskcard";

function Dashboard() {

    // Tasks shown in My Tasks section
    const tasks = [
    {
        title: "Learn React",
        description: "Understand components",
        status: "In Progress",
        link: "/tasks/learn-react"
    },
    {
        title: "Software Engineering",
        description: "Project Management Assignment",
        status: "Pending",
        link: "/tasks/software-engineering"
    },
    {
        title: "Theory of Computation",
        description: "Group Project",
        status: "Pending",
        link: "/tasks/theory-of-computation"
    },
    {
        title: "Research Methodology",
        description: "Literature Assignment",
        status: "Pending",
        link: "/tasks/research-methodology"
    },
    {
        title: "Computer Networks",
        description: "Network Protocols Assignment",
        status: "Pending",
        link: "/tasks/computer-networks"
    },
    {
        title: "Artificial Intelligence",
        description: "AI Fundamentals Assignment",
        status: "Pending",
        link: "/tasks/artificial-intelligence"
    },
    {
        title: "Environmental Studies",
        description: "Environmental Issues Assignment",
        status: "Pending",
        link: "/tasks/evs"
    },
    {
        title: "NSS",
        description: "NSS Activities and Assignment",
        status: "Pending",
        link: "/tasks/nss"
    }
];
    return (
        <div className="dashboard">

            {/* ================= HEADER ================= */}
            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome back! Here's an overview of your tasks.
                    </p>
                </div>

                <button className="add-task-btn">
                    + Add Task
                </button>

            </div>


            {/* ================= SUMMARY CARDS ================= */}
            <div className="startcard">
                <Startcard />
            </div>


            {/* ================= MY TASKS ================= */}
            <div className="task-section">

                <div className="section-header">

                    <div>
                        <h2>My Tasks</h2>
                        <p>Manage your pending and completed tasks</p>
                    </div>

                    <button className="view-all-btn">
                        View All
                    </button>

                </div>


                {/* Task Grid */}
                <div className="task-container">

                    {tasks.map((task, index) => (
                        <TaskCard
                            key={index}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            link={task.link}
                        />
                    ))}

                </div>

            </div>


            {/* ================= UPCOMING DEADLINES ================= */}
            <div className="deadline-section">

                <h2>Upcoming Deadlines</h2>

                <div className="deadline-list">


                    {/* Software Engineering */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Software Engineering and Project Management
                            </h3>

                            <p>
                                Project Management Assignment
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 12
                        </span>

                    </div>


                    {/* Theory of Computation */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Theory of Computation
                            </h3>

                            <p>
                                Group Project
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 15
                        </span>

                    </div>


                    {/* Research Methodology */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Research Methodology
                            </h3>

                            <p>
                                Literature Assignment
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 18
                        </span>

                    </div>


                    {/* Computer Networks */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Computer Networks
                            </h3>

                            <p>
                                Network Protocols Assignment
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 20
                        </span>

                    </div>


                    {/* Artificial Intelligence */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Artificial Intelligence
                            </h3>

                            <p>
                                AI Fundamentals Assignment
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 23
                        </span>

                    </div>


                    {/* Environmental Studies */}
                    <div className="deadline-card">

                        <div>
                            <h3>
                                Environmental Studies (EVS)
                            </h3>

                            <p>
                                Environmental Issues Assignment
                            </p>
                        </div>

                        <span className="deadline-date">
                            Sep 25
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;