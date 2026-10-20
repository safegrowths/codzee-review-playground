// In-memory storage keeps this demo self-contained. Data resets when the process restarts.
const tasks = [];
let nextId = 1;

function listTasks() {
  return [...tasks];
}

function findTask(id) {
  return tasks.find((task) => task.id === Number(id));
}

function createTask({ title, description = "" }) {
  const task = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
}

function updateTask(id, changes) {
  const task = findTask(id);
  if (!task) return null;

  if (typeof changes.title === "string") task.title = changes.title.trim();
  if (typeof changes.description === "string") task.description = changes.description.trim();
  if (typeof changes.completed === "boolean") task.completed = changes.completed;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function resetTasksForTests() {
  tasks.splice(0, tasks.length);
  nextId = 1;
}

module.exports = { listTasks, findTask, createTask, updateTask, deleteTask, resetTasksForTests };
