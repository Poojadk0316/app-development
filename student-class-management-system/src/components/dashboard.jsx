import StatCard from "./startcard";
import TaskCard from "./taskcard";
import AddTask from "./addtask";

function Dashboard(props) {

    // Change task status
    const toggleTask = async (id) => {

        const task = props.tasks.find((task) => task.id === id);

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
                    if (task.id === id) {
                        return updatedTask;
                    }

                    return task;
                })
            );

        } catch (error) {
            console.log("Error updating task:", error);
        }
    };


    // Add new task
    const addTask = (newTask) => {

        props.setTasks([
            ...props.tasks,
            newTask
        ]);
    };


    // Delete task
    const deleteTask = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            const deletedTask = await response.json();

            props.setTasks(
                props.tasks.filter(
                    (task) => task.id !== deletedTask.id
                )
            );

        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };


    // Calculate statistics
    const totalTasks = props.tasks.length;

    const completedTasks = props.tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = props.tasks.filter(
        (task) => task.status === "Pending"
    ).length;


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
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                    />

                ))}

            </div>

        </main>
    );
}

export default Dashboard;