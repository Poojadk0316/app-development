import { useState } from "react";
import TaskCard from "./taskcard";
import AddTask from "./Addtask";

function Task({
    tasks,
    addTask,
    changeStatus,
    deleteTask
}) {

    const [showAddTask, setShowAddTask] = useState(false);


    // ADD NEW TASK
    const handleAddTask = (newTask) => {

        addTask(newTask);

        setShowAddTask(false);

    };


    return (
        <div className="tasks-page">

            {/* PAGE HEADER */}
            <div className="tasks-header">

                <div>

                    <p className="page-label">
                        TASK MANAGEMENT
                    </p>

                    <h1>
                        My Tasks
                    </h1>

                    <p>
                        Manage your tasks and track your progress.
                    </p>

                </div>


                {/* ADD TASK BUTTON */}
                <button
                    type="button"
                    className="add-task-button"
                    onClick={() =>
                        setShowAddTask(!showAddTask)
                    }
                >
                    {showAddTask
                        ? "✕ Close"
                        : "+ Add Task"}
                </button>

            </div>


            {/* ADD TASK FORM */}

            {showAddTask && (

                <AddTask
                    onAddTask={handleAddTask}
                    onClose={() =>
                        setShowAddTask(false)
                    }
                />

            )}


            {/* TASK SECTION */}

            <div className="task-section">

                <div className="section-header">

                    <h2>
                        All Tasks
                    </h2>

                    <span className="task-count">
                        {tasks.length} Tasks
                    </span>

                </div>


                {/* TASK LIST */}

                <div className="task-container">

                    {tasks.length === 0 ? (

                        <div className="empty-tasks">

                            <div className="empty-icon">
                                📋
                            </div>

                            <h2>
                                No Tasks Yet
                            </h2>

                            <p>
                                Click "Add Task" to create
                                your first task.
                            </p>

                        </div>

                    ) : (

                        tasks.map((task) => (

                            <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                onToggle={() =>
                                    changeStatus(task.id)
                                }
                                onDelete={() =>
                                    deleteTask(task.id)
                                }
                            />

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Task;