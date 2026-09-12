import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Welcome from "./components/welcome";
import Dashboard from "./components/dashboard";
import Task from "./components/task";
import TaskDetails from "./components/taskdetails";

function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                setTasks(data);

            })
            .catch((error) => {

                console.log("Error:", error);

            });

    }, []);


    const addTask = (newTask) => {

        setTasks((previousTasks) => [
            ...previousTasks,
            newTask
        ]);

    };


    const changeStatus = (id) => {

        setTasks((previousTasks) =>
            previousTasks.map((task) => {

                if (task.id === id) {

                    if (task.status === "Pending") {
                        return {
                            ...task,
                            status: "In Progress"
                        };
                    }

                    if (task.status === "In Progress") {
                        return {
                            ...task,
                            status: "Completed"
                        };
                    }

                    return {
                        ...task,
                        status: "Pending"
                    };
                }

                return task;
            })
        );

    };


    const deleteTask = (id) => {

        setTasks((previousTasks) =>
            previousTasks.filter(
                (task) => task.id !== id
            )
        );

    };


    return (
        <>
            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Welcome />}
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

                <Route
                    path="/tasks/:id"
                    element={
                        <TaskDetails tasks={tasks} />
                    }
                />

            </Routes>
        </>
    );
}

export default App;