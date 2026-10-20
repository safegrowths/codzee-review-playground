# Codzee Review Playground — Task API

A small Node.js + Express REST API designed for exploring code review quality. It includes request validation, consistent error responses, filtering, and automated tests.

## Requirements
- Node.js 20+
- npm

## Run locally
```bash
npm install
npm test
npm start
```
The API starts on `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks?completed=true` | Filter tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update task fields |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create task
```json
{
  "title": "Review pull requests",
  "description": "Check validation and error handling"
}
```

Task data is stored in memory, so it resets when the server restarts. This is intentional for a compact review exercise, not production persistence.

## Suggested PR workflow

Create three separate branches and pull requests instead of pushing every feature in one PR. The project is a starting point; verify the code and tests yourself, and capture Codzee's actual feedback before writing your final evaluation.

See [`docs/PR_PLAN.md`](docs/PR_PLAN.md) and [`docs/CODZEE_FEEDBACK_TEMPLATE.md`](docs/CODZEE_FEEDBACK_TEMPLATE.md).
