function sendValidationError(res, message, field) {
  return res.status(400).json({
    error: { code: "VALIDATION_ERROR", message, field }
  });
}

function validateCreateTask(req, res, next) {
  const { title, description } = req.body || {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return sendValidationError(res, "title is required and cannot be blank.", "title");
  }
  if (title.trim().length > 120) {
    return sendValidationError(res, "title must be 120 characters or fewer.", "title");
  }
  if (description !== undefined && typeof description !== "string") {
    return sendValidationError(res, "description must be a string.", "description");
  }
  if (typeof description === "string" && description.length > 2000) {
    return sendValidationError(res, "description must be 2000 characters or fewer.", "description");
  }

  return next();
}

function validateUpdateTask(req, res, next) {
  const body = req.body || {};
  const allowed = ["title", "description", "completed"];
  const keys = Object.keys(body);

  if (keys.length === 0) {
    return sendValidationError(res, "At least one field must be provided.", "body");
  }
  if (keys.some((key) => !allowed.includes(key))) {
    return sendValidationError(res, "Only title, description, and completed can be updated.", "body");
  }
  if ("title" in body && (typeof body.title !== "string" || body.title.trim().length === 0 || body.title.trim().length > 120)) {
    return sendValidationError(res, "title must be a non-empty string of at most 120 characters.", "title");
  }
  if ("description" in body && (typeof body.description !== "string" || body.description.length > 2000)) {
    return sendValidationError(res, "description must be a string of at most 2000 characters.", "description");
  }
  if ("completed" in body && typeof body.completed !== "boolean") {
    return sendValidationError(res, "completed must be a boolean.", "completed");
  }

  return next();
}

module.exports = { validateCreateTask, validateUpdateTask };
