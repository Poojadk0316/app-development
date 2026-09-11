import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Task from "./components/task";

function App() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            description: "Understand React components",
            status: "In Progress"
        },
        {
            id: 2,
            title: "Learn MongoDB",
            description: "Create a simple React application",
            status: "Pending"
        },
        {
            id: 3,
            title: "Deploy App",
            description: "Host the application online",
            status: "Completed"
        }
    ]);

    const changeStatus = (id) => {

        setTasks((prevTasks) =>
            prevTasks.map((task) => {

                if (task.id !== id) {
                    return task;
                }

                let newStatus;

                if (task.status === "Pending") {
                    newStatus = "In Progress";
                }
                else if (task.status === "In Progress") {
                    newStatus = "Completed";
                }
                else {
                    newStatus = "Pending";
                }

                return {
                    ...task,
                    status: newStatus
                };
            })
        );
    };

    const deleteTask = (id) => {

        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    const addTask = (newTask) => {

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                ...newTask,
                id: Date.now()
            }
        ]);
    };

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <Dashboard tasks={tasks} />
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <Task
                            tasks={tasks}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            deleteTask={deleteTask}
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;