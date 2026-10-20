function notFoundHandler(req, res, _next) {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} was not found.`
    }
  });
}

function errorHandler(err, _req, res, _next) {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: { code: "INVALID_JSON", message: "Request body contains invalid JSON." }
    });
  }

  console.error(err);
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." }
  });
}

module.exports = { notFoundHandler, errorHandler };
