function TaskCard({
    title,
    description,
    status,
    link,
    onChangeStatus
}) {

    return (
        <div className="task-card">

            <div className="task-info">

                <h3>{title}</h3>

                <p>{description}</p>

                <span className={`task-status ${status
                    .toLowerCase()
                    .replace(" ", "-")}`}>
                    {status}
                </span>

            </div>

            <div className="task-actions">

                <button
                    className="change-status-btn"
                    onClick={onChangeStatus}
                >
                    Change Status
                </button>

            </div>

        </div>
    );
}

export default TaskCard;