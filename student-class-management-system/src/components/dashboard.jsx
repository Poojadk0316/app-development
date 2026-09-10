import { useState } from "react";
import Startcard from "./startcard";
import TaskCard from "./taskcard";
import AddTask from "./addtask";

function Dashboard() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            description: "Understand components",
            status: "In Progress",
            link: "/tasks/learn-react"
        },
        { id: 2, title: "Learn MongoDB", description: "Create a simple React app", status: "Pending" },

        { id: 3, title: "Deploy App", description: "Host the app on a platform", status: "Completed" },
    ]);

    const [showAddTask, setShowAddTask] = useState(false);


    // Change task status
    const changeStatus = (id) => {

        setTasks((prevTasks) =>
            prevTasks.map((task) => {

                if (task.id === id) {

                    let newStatus;

                    if (task.status === "Pending") {
                        newStatus = "In Progress";
                    }
                    else if (task.status === "In Progress") {
                        newStatus = "Completed";
                    }
                    else {
                        newStatus = "Pending";
                    }

                    return {
                        ...task,
                        status: newStatus
                    };
                }

                return task;
            })
        );
    };


    // Add new task
    const addTask = (newTask) => {

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                ...newTask,
                id: Date.now()
            }
        ]);

        setShowAddTask(false);
    };


    // Task statistics
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
        <div className="dashboard">

            {/* ================= HEADER ================= */}

            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Welcome back! Here's an overview of your tasks.
                    </p>
                </div>

                <button
                    className="add-task-btn"
                    onClick={() => setShowAddTask(true)}
                >
                    + Add Task
                </button>

            </div>


            {/* ================= ADD TASK ================= */}

            {showAddTask && (
                <AddTask
                    onAddTask={addTask}
                    onClose={() => setShowAddTask(false)}
                />
            )}


            {/* ================= SUMMARY CARDS ================= */}

            <div className="startcard">

                <Startcard
                    totalTasks={totalTasks}
                    completedTasks={completedTasks}
                    pendingTasks={pendingTasks}
                    inProgressTasks={inProgressTasks}
                />

            </div>


            {/* ================= MY TASKS ================= */}

            <div className="task-section">

                <div className="section-header">

                    <div>
                        <h2>My Tasks</h2>

                        <p>
                            Manage your pending and completed tasks
                        </p>
                    </div>

                    <button className="view-all-btn">
                        View All
                    </button>

                </div>


                {/* Task Grid */}

                <div className="task-container">

                    {tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            link={task.link}
                            onChangeStatus={() =>
                                changeStatus(task.id)
                            }
                        />

                    ))}

                </div>

            </div>


            {/* ================= UPCOMING DEADLINES ================= */}

            <div className="deadline-section">

                <h2>Upcoming Deadlines</h2>

                <div className="deadline-list">

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