import { useState } from "react";

function AddTask({
    onAddTask,
    onClose
}) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("Pending");


    // SUBMIT FORM
    const handleSubmit = (e) => {

        e.preventDefault();


        if (title.trim() === "") {

            alert("Please enter a task title");

            return;

        }


        const newTask = {

            id: Date.now(),

            title: title.trim(),

            description:
                description.trim() ||
                "No description added.",

            status: status

        };


        onAddTask(newTask);


        // Clear form

        setTitle("");

        setDescription("");

        setStatus("Pending");

    };


    return (
        <div className="add-task-form">

            <div className="add-task-title">

                <div>

                    <p className="page-label">
                        NEW TASK
                    </p>

                    <h2>
                        Add New Task
                    </h2>

                </div>

            </div>


            <form onSubmit={handleSubmit}>

                {/* TITLE */}

                <div className="form-group">

                    <label>
                        Task Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter task title..."
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                </div>


                {/* DESCRIPTION */}

                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Enter task description..."
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    ></textarea>

                </div>


                {/* STATUS */}

                <div className="form-group">

                    <label>
                        Status
                    </label>

                    <select
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


                {/* BUTTONS */}

                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-task-btn"
                    >
                        ✓ Add Task
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