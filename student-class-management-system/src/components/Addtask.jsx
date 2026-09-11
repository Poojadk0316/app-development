import { useState } from "react";

function AddTask({ onAddTask, onClose }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (title.trim() === "") {
            alert("Please enter a task title");
            return;
        }

        onAddTask({
            title,
            description,
            status
        });

        setTitle("");
        setDescription("");
        setStatus("Pending");
    };

    return (

        <div className="add-task-form">

            <h2>
                Add New Task
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                </select>


                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-task-btn"
                    >
                        Add Task
                    </button>

                    <button
                        type="button"
                        className="cancel-task-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );
}

export default AddTask;