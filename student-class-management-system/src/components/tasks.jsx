function Tasks(props) {
    return (
        <main>

            <h1>Tasks Page</h1>

            <div className="tasks-container">

                {props.tasks.map((task) => (

                    <div className="task-card" key={task.id}>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>Status: {task.status}</p>

                    </div>

                ))}

            </div>

        </main>
    );
}

export default Tasks;