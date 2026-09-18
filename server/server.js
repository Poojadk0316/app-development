const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const Task = require("./models/Task");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// CONNECT TO MONGODB
// ===============================

connectDB();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("FoodRescue AI Backend is running!");
});

// ===============================
// AUTHENTICATION ROUTES
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// DONATION ROUTES
// ===============================

app.use("/api/donations", donationRoutes);


// ======================================================
// TASK ROUTES
// ======================================================

// ===============================
// GET ALL TASKS
// ===============================

app.get("/api/tasks", async (req, res) => {
    try {

        const tasks = await Task.find().sort({ createdAt: -1 });

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

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        res.status(200).json(task);

    } catch (error) {

        console.log("Error fetching task:", error.message);

        res.status(500).json({
            message: "Failed to fetch task"
        });

    }
});


// ===============================
// ADD NEW TASK
// ===============================

app.post("/api/tasks", async (req, res) => {
    try {

        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const newTask = new Task({
            title: title,
            description: description,
            status: status || "Pending"
        });

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

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: status
            },
            {
                new: true
            }
        );

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

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        console.log("Task Deleted:", deletedTask);

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });

    } catch (error) {

        console.log("Error deleting task:", error.message);

        res.status(500).json({
            message: "Failed to delete task"
        });

    }
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});