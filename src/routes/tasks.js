const express = require("express");
const store = require("../data/tasks");
const { validateCreateTask, validateUpdateTask } = require("../middleware/validation");

const router = express.Router();

router.get("/", (req, res) => {
  const { completed } = req.query;
  let tasks = store.listTasks();

  if (completed !== undefined) {
    if (!["true", "false"].includes(completed)) {
      return res.status(400).json({
        error: { code: "INVALID_QUERY", message: "completed must be true or false." }
      });
    }
    tasks = tasks.filter((task) => task.completed === (completed === "true"));
  }

  return res.json({ data: tasks, count: tasks.length });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: { code: "INVALID_ID", message: "Task id must be a positive integer." }
    });
  }

  const task = store.findTask(id);
  if (!task) {
    return res.status(404).json({
      error: { code: "TASK_NOT_FOUND", message: "Task was not found." }
    });
  }

  return res.json({ data: task });
});

router.post("/", validateCreateTask, (req, res) => {
  const task = store.createTask(req.body);
  return res.status(201).json({ data: task });
});

router.patch("/:id", validateUpdateTask, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: { code: "INVALID_ID", message: "Task id must be a positive integer." }
    });
  }

  const task = store.updateTask(id, req.body);
  if (!task) {
    return res.status(404).json({
      error: { code: "TASK_NOT_FOUND", message: "Task was not found." }
    });
  }

  return res.json({ data: task });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: { code: "INVALID_ID", message: "Task id must be a positive integer." }
    });
  }

  if (!store.deleteTask(id)) {
    return res.status(404).json({
      error: { code: "TASK_NOT_FOUND", message: "Task was not found." }
    });
  }

  return res.status(204).end();
});

module.exports = router;
