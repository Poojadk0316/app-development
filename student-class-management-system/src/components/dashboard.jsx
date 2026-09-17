import StatCard from "./startcard";
import TaskCard from "./taskcard";
import AddTask from "./addtask";

function Dashboard(props) {

    // ===============================
    // CHANGE TASK STATUS
    // ===============================

    const toggleTask = async (id) => {

        const task = props.tasks.find(
            (task) => task._id === id
        );

        if (!task) {
            return;
        }

        const newStatus =
            task.status === "Completed"
                ? "Pending"
                : "Completed";

        try {

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTask = await response.json();

            props.setTasks(
                props.tasks.map((task) => {

                    if (task._id === id) {
                        return updatedTask;
                    }

                    return task;

                })
            );

        } catch (error) {

            console.log(
                "Error updating task:",
                error
            );

        }

    };


    // ===============================
    // ADD NEW TASK
    // ===============================

    const addTask = (newTask) => {

        props.setTasks([
            ...props.tasks,
            newTask
        ]);

    };


    // ===============================
    // DELETE TASK
    // ===============================

    const deleteTask = async (id) => {

        try {

            console.log("Deleting Task ID:", id);

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            console.log("Delete Response:", data);

            if (!response.ok) {

                throw new Error(
                    data.message || "Failed to delete task"
                );

            }

            // Remove deleted task from frontend
            props.setTasks(
                props.tasks.filter(
                    (task) => task._id !== id
                )
            );

        } catch (error) {

            console.log(
                "Error deleting task:",
                error
            );

        }

    };


    // ===============================
    // CALCULATE STATISTICS
    // ===============================

    const totalTasks = props.tasks.length;

    const completedTasks = props.tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = props.tasks.filter(
        (task) => task.status === "Pending"
    ).length;


    // ===============================
    // DISPLAY
    // ===============================

    return (

        <main>

            {/* ================= STATS ================= */}

            <div className="stats-container">

                <StatCard
                    title="Total Tasks"
                    value={totalTasks}
                />

                <StatCard
                    title="Completed"
                    value={completedTasks}
                />

                <StatCard
                    title="Pending"
                    value={pendingTasks}
                />

            </div>


            {/* ================= ADD TASK ================= */}

            <AddTask
                onAddTask={addTask}
            />


            {/* ================= RECENT TASKS ================= */}

            <h2>Recent Tasks</h2>

            <div className="tasks-container">

                {props.tasks.map((task) => (

                    <TaskCard

                        key={task._id}

                        id={task._id}

                        title={task.title}

                        description={task.description}

                        status={task.status}

                        onToggle={() =>
                            toggleTask(task._id)
                        }

                        onDelete={() =>
                            deleteTask(task._id)
                        }

                    />

                ))}

            </div>

        </main>

    );

}

export default Dashboard;