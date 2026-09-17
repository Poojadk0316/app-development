// ===============================
// LOAD ENVIRONMENT VARIABLES
// ===============================

require("dotenv").config();


// ===============================
// DNS CONFIGURATION
// ===============================

const dns = require("dns");

dns.setServers(["8.8.8.8"]);


// ===============================
// IMPORTS
// ===============================

const Task = require("./models/Task.js");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


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
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        console.log("MongoDB Connected Successfully!");

    })
    .catch((error) => {

        console.log("MongoDB Connection Failed:", error.message);

    });


// ===============================
// GET ALL TASKS
// ===============================

app.get("/api/tasks", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        console.log("Error fetching tasks:", error.message);

        res.status(500).json({

            message: "Failed to fetch tasks"

        });

    }

});


// ===============================
// GET ONE TASK
// ===============================

app.get("/api/tasks/:id", async (req, res) => {

    try {

        const taskData = await Task.findById(req.params.id);

        if (!taskData) {

            return res.status(404).json({

                message: "Task not found!"

            });

        }

        res.status(200).json(taskData);

    } catch (error) {

        console.log("Error fetching task:", error.message);

        res.status(500).json({

            message: "Invalid Task ID"

        });

    }

});


// ===============================
// ADD NEW TASK
// ===============================

app.post("/api/tasks", async (req, res) => {

    try {

        const { title, description, status } = req.body;


        // Check required fields

        if (!title || !description) {

            return res.status(400).json({

                message: "Title and description are required"

            });

        }


        // Create task

        const newTask = new Task({

            title: title,

            description: description,

            status: status || "Pending"

        });


        // Save task to MongoDB

        const savedTask = await newTask.save();


        console.log("New Task Added:", savedTask);


        res.status(201).json(savedTask);

    } catch (error) {

        console.log("Error adding task:", error.message);

        res.status(500).json({

            message: "Failed to add task"

        });

    }

});


// ===============================
// CHANGE TASK STATUS
// ===============================

app.put("/api/tasks/:id", async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );


        // Check if task exists

        if (!updatedTask) {

            return res.status(404).json({

                message: "Task Not Found"

            });

        }


        console.log("Task Updated:", updatedTask);


        res.status(200).json(updatedTask);

    } catch (error) {

        console.log("Error updating task:", error.message);

        res.status(500).json({

            message: "Failed to update task"

        });

    }

});


// ===============================
// DELETE TASK
// ===============================

app.delete("/api/tasks/:id", async (req, res) => {

    try {

        const deletedTask = await Task.findByIdAndDelete(

            req.params.id

        );


        // Check if task exists

        if (!deletedTask) {

            return res.status(404).json({

                message: "Task Not Found"

            });

        }

        console.log("Task Deleted:", deletedTask);


        res.status(200).json(deletedTask);

    } catch (error) {

        console.log("Error deleting task:", error.message);

        res.status(500).json({

            message: "Failed to delete task"

        });

    }

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

