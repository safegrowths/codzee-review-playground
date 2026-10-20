const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const store = require("../src/data/tasks");

test.beforeEach(() => store.resetTasksForTests());

test("health endpoint returns service status", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
});

test("creates a task and trims its title", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "  Prepare review  ", description: " Test Codzee " });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.title, "Prepare review");
  assert.equal(response.body.data.description, "Test Codzee");
  assert.equal(response.body.data.completed, false);
});

test("rejects a blank title", async () => {
  const response = await request(app).post("/api/tasks").send({ title: "   " });
  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, "VALIDATION_ERROR");
});


test("lists tasks and filters by completion status", async () => {
  await request(app)
    .post("/api/tasks")
    .send({ title: "Open task" });

  const created = await request(app)
    .post("/api/tasks")
    .send({ title: "Done task" });

  await request(app)
    .patch(`/api/tasks/${created.body.data.id}`)
    .send({ completed: true });

  const response = await request(app)
    .get("/api/tasks?completed=true");

  assert.equal(response.status, 200);
  assert.equal(response.body.pagination.total, 1);
  assert.equal(response.body.data.length, 1);
  assert.equal(response.body.data[0].title, "Done task");
});


test("returns 404 when a task does not exist", async () => {
  const response = await request(app).get("/api/tasks/999");
  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "TASK_NOT_FOUND");
});

test("rejects invalid completion query values", async () => {
  const response = await request(app).get("/api/tasks?completed=yes");
  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, "INVALID_QUERY");
});

test("deletes a task and returns no content", async () => {
  const created = await request(app).post("/api/tasks").send({ title: "Temporary" });
  const response = await request(app).delete(`/api/tasks/${created.body.data.id}`);
  assert.equal(response.status, 204);
});
