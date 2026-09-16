import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent empty task
        if (title.trim() === "" || description.trim() === "") {
            alert("Please enter both title and description.");
            return;
        }

        // Do NOT send id from frontend
        const newTask = {
            title: title,
            description: description,
            status: "Pending"
        };

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const data = await response.json();

            // Send newly created task to Dashboard
            props.onAddTask(data);

            // Clear form
            setTitle("");
            setDescription("");

        } catch (error) {
            console.log("Error adding task:", error);
            alert("Unable to add task. Make sure the backend is running.");
        }
    };

    return (
        <div>
            <h2>Add Task</h2>

            <form onSubmit={handleSubmit}>

                <label>Add Title: </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />

                <br />
                <br />

                <label>Add Description: </label>

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />

                <br />
                <br />

                <button type="submit">
                    Add Task!
                </button>

            </form>
        </div>
    );
}

export default AddTask;