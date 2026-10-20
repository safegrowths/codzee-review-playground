const express = require("express");
const tasksRouter = require("./routes/tasks");
const { notFoundHandler, errorHandler } = require("./middleware/errors");

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "codzee-review-playground" });
});

app.use("/api/tasks", tasksRouter);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
