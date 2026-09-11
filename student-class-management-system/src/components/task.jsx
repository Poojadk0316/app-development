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

    const handleAddTask = (newTask) => {

        addTask(newTask);

        setShowAddTask(false);
    };

    return (

        <div className="tasks-page">

            <div className="tasks-header">

                <h1>
                    My Tasks
                </h1>

                <p>
                    Manage all your tasks in one place
                </p>

                <button
                    type="button"
                    className="add-task-btn"
                    onClick={() => setShowAddTask(true)}
                >
                    + Add Task
                </button>

            </div>


            {showAddTask && (

                <AddTask
                    onAddTask={handleAddTask}
                    onClose={() => setShowAddTask(false)}
                />

            )}


            <div className="task-section">

                <div className="section-header">

                    <h2>
                        All Tasks
                    </h2>

                    <p>
                        Manage your pending and completed tasks
                    </p>

                </div>


                <div className="task-container">

                    {tasks.length === 0 ? (

                        <div className="no-tasks">

                            <div className="no-tasks-icon">
                                📋
                            </div>

                            <h3>
                                No tasks available
                            </h3>

                            <p>
                                Add a new task to get started.
                            </p>

                            <button
                                type="button"
                                className="add-task-btn"
                                onClick={() => setShowAddTask(true)}
                            >
                                + Add Your First Task
                            </button>

                        </div>

                    ) : (

                        tasks.map((task) => (

                            <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                onChangeStatus={changeStatus}
                                onDelete={deleteTask}
                            />

                        ))

                    )}

                </div>

            </div>

        </div>

    );
}

export default Task;