import { Link } from "react-router-dom";

function TaskCard({
    id,
    title,
    description,
    status,
    onToggle,
    onDelete
}) {

    return (
        <div className="task-card">

            {/* Left side */}
            <div className="task-card-left">

                <div className="task-check">

                    {status === "Completed" && "✓"}

                </div>


                <div className="task-card-content">

                    <span className="task-id">
                        TASK #{id}
                    </span>

                    <h3>
                        {title}
                    </h3>

                    <p>
                        {description}
                    </p>

                </div>

            </div>


            {/* Status */}
            <span
                className={`status-badge ${
                    status
                        .toLowerCase()
                        .replace(" ", "-")
                }`}
            >
                {status}
            </span>


            {/* Buttons */}
            <div className="task-actions">

                <button
                    type="button"
                    className="change-status-btn"
                    onClick={onToggle}
                >
                    Change Status
                </button>


                <Link
                    to={`/tasks/${id}`}
                    className="details-btn"
                >
                    View Details →
                </Link>


                <button
                    type="button"
                    className="delete-task-btn"
                    onClick={onDelete}
                >
                    Delete
                </button>

            </div>

    </div>
    );
}

export default TaskCard;