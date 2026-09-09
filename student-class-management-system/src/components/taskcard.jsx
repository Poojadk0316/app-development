function TaskCard({ title, description, status, link }) {
    return (
        <a href={link} className="task-card">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Status: {status}</p>
            </div>
        </a>
    );
}

export default TaskCard;