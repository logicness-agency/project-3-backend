const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /tasks – Get all tasks for the authenticated user
router.get("/tasks", isAuthenticated, (req, res, next) => {
  Task.find({ owner: req.payload._id })
    .populate("category")
    .then((tasks) => res.json(tasks))
    .catch(next);
});

// POST /tasks – Create a new task for the authenticated user
router.post("/tasks", isAuthenticated, (req, res, next) => {
  const newTask = { ...req.body, owner: req.payload._id };

  Task.create(newTask)
    .then((createdTask) => res.status(201).json(createdTask))
    .catch(next);
});

// GET /tasks/:taskId – Get a single task by ID (only if it belongs to the user)
router.get("/tasks/:taskId", isAuthenticated, (req, res, next) => {
  Task.findOne({ _id: req.params.taskId, owner: req.payload._id })
    .populate("category")
    .then((task) => {
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    })
    .catch(next);
});

// PUT /tasks/:taskId – Update a task (only if it belongs to the user)
router.put("/tasks/:taskId", isAuthenticated, (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId, owner: req.payload._id },
    req.body,
    { new: true }
  )
    .then((updatedTask) => res.json(updatedTask))
    .catch(next);
});

// DELETE /tasks/:taskId – Delete a task (only if it belongs to the user)
router.delete("/tasks/:taskId", isAuthenticated, (req, res, next) => {
  Task.findOneAndDelete({ _id: req.params.taskId, owner: req.payload._id })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
