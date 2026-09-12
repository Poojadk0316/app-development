import { Link, useParams } from "react-router-dom";

function TaskDetails({ tasks }) {

    const { id } = useParams();

    const task = tasks.find(
        (task) => String(task.id) === String(id)
    );


    // If task does not exist
    if (!task) {

        return (
            <div className="task-details-page">

                <div className="details-card">

                    <h1>
                        Task Not Found
                    </h1>

                    <p>
                        The task you are looking for does not exist.
                    </p>

                    <Link
                        to="/tasks"
                        className="back-btn"
                    >
                        ← Back to Tasks
                    </Link>

                </div>

            </div>
        );
    }


    return (
        <div className="task-details-page">

            {/* Back button */}
            <Link
                to="/tasks"
                className="back-btn"
            >
                ← Back to Tasks
            </Link>


            {/* Details Card */}
            <div className="details-card">

                <span className="details-id">
                    TASK #{task.id}
                </span>

                <h1>
                    {task.title}
                </h1>


                {/* Status */}
                <div className="details-status">

                    <span
                        className={`status-badge ${
                            task.status
                                .toLowerCase()
                                .replace(" ", "-")
                        }`}
                    >
                        {task.status}
                    </span>

                </div>


                {/* Description */}
                <div className="details-section">

                    <h3>
                        Description
                    </h3>

                    <p>
                        {task.description}
                    </p>

                </div>


                {/* Information */}
                <div className="details-info">

                    <div>

                        <span>
                            Task ID
                        </span>

                        <strong>
                            #{task.id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Status
                        </span>

                        <strong>
                            {task.status}
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TaskDetails;