// ===============================
// IMPORTS
// ===============================

const express = require("express");
const cors = require("cors");


// ===============================
// CREATE EXPRESS APP
// ===============================

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// TASK ARRAY
// ===============================

const tasks = [

    {
        id: 1,
        title: "Learn React",
        description: "Understanding Components",
        status: "Completed"
    },

    {
        id: 2,
        title: "Learn JavaScript",
        description: "Understanding Variables, Functions",
        status: "Pending"
    },

    {
        id: 3,
        title: "Learn MongoDB",
        description: "Understanding Databases",
        status: "Pending"
    },

    {
        id: 4,
        title: "NSS",
        description: "Complete NSS Activities",
        status: "Pending"
    }

];


// ===============================
// GET ALL TASKS
// ===============================

app.get("/api/tasks", (req, res) => {

    res.json(tasks);

});


// ===============================
// GET ONE TASK
// ===============================

app.get("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task not found!"
        });

    }

    res.json(task);

});


// ===============================
// ADD NEW TASK
// ===============================

app.post("/api/tasks", (req, res) => {

    const { title, description, status } = req.body;

    if (!title || !description) {

        return res.status(400).json({
            message: "Title and description are required"
        });

    }

    const newTask = {

        id: tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1,

        title: title,

        description: description,

        status: status || "Pending"

    };

    tasks.push(newTask);

    console.log("New Task Added:", newTask);

    res.status(201).json(newTask);

});


// ===============================
// CHANGE TASK STATUS
// ===============================

app.put("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task Not Found"
        });

    }

    task.status = req.body.status;

    console.log("Task Updated:", task);

    res.json(task);

});


// ===============================
// DELETE TASK
// ===============================

app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex(
        (task) => task.id === id
    );

    if (taskIndex === -1) {

        return res.status(404).json({
            message: "Task Not Found"
        });

    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    console.log("Task Deleted:", deletedTask);

    res.json(deletedTask);

});


// ===============================
// TEST BACKEND
// ===============================

app.get("/", (req, res) => {

    res.send("Backend is Working!!");

});


// ===============================
// START SERVER
// ===============================

app.listen(5000, () => {

    console.log("Server is Running on port 5000");

});