function TaskCard({
    id,
    title,
    description,
    status,
    onChangeStatus,
    onDelete
}) {

    return (

        <div className="task-card">

            <div className="task-card-content">

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

                <span
                    className={`status-badge ${status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                >
                    {status}
                </span>

            </div>


            <div className="task-actions">

                <button
                    type="button"
                    className="change-status-btn"
                    onClick={() => onChangeStatus(id)}
                >
                    Change Status
                </button>

                <button
                    type="button"
                    className="delete-task-btn"
                    onClick={() => onDelete(id)}
                >
                    Delete Task
                </button>

            </div>

        </div>

    );
}

export default TaskCard;