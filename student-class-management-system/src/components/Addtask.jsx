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
            title: title,
            description: description,
            status: status
        });

        setTitle("");
        setDescription("");
        setStatus("Pending");
    };

    return (
        <div className="add-task-page">

            <div className="add-task-card">

                {/* Header */}

                <div className="add-task-header">

                    <div>
                        <span className="add-task-label">
                            NEW TASK
                        </span>

                        <h2>Add New Task</h2>

                        <p>
                            Create a new task and keep your work organized.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Form */}

                <form onSubmit={handleSubmit}>

                    {/* Task Title */}

                    <div className="form-group">

                        <label htmlFor="task-title">
                            Task Title
                        </label>

                        <input
                            id="task-title"
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label htmlFor="task-description">
                            Description
                        </label>

                        <textarea
                            id="task-description"
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label htmlFor="task-status">
                            Status
                        </label>

                        <select
                            id="task-status"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
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

                    </div>


                    {/* Buttons */}

                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-task-btn"
                        >
                            + Add Task
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddTask;