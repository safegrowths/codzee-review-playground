# Pull Request Plan

Open each PR separately and wait for Codzee to review it before moving to the next PR. Do not claim a PR or review exists until it is actually created.

## PR 1 — Input validation and API contract
**Suggested title:** `feat: validate task create and update payloads`

Scope:
- Require a non-empty task title.
- Enforce title and description length limits.
- Reject unsupported fields and invalid `completed` values.
- Return consistent 400 responses with an error code and field.

Review questions:
- Are edge cases handled (whitespace, missing body, wrong types, long strings)?
- Are the error messages useful and consistent?
- Are any valid inputs accidentally rejected?

## PR 2 — Task filtering and identifier handling
**Suggested title:** `feat: add completion filter and safe task id validation`

Scope:
- Support `GET /api/tasks?completed=true|false`.
- Reject unsupported query values.
- Validate IDs as positive integers.
- Return clear 404 responses for missing tasks.

Review questions:
- Are query parameters parsed strictly?
- Are invalid IDs consistently handled across routes?
- Are there cases where a missing task returns the wrong status?

## PR 3 — Automated tests and error handling
**Suggested title:** `test: cover task API success and failure paths`

Scope:
- Add API tests for health, create, validation, filtering, missing records, and delete.
- Handle malformed JSON with a stable error response.
- Keep unknown-route and unexpected-error responses consistent.

Review questions:
- Do tests cover both happy paths and failure paths?
- Could tests be flaky due to shared in-memory state?
- Are internal error details exposed to API clients?
- Is console logging appropriate for this small service?

## Git workflow example
```bash
git checkout -b feat/task-validation
# make only PR 1 changes
git add .
git commit -m "feat: validate task payloads"
git push -u origin feat/task-validation
# Open a PR on GitHub and wait for Codzee review

git checkout main
git pull
git checkout -b feat/task-filtering
# make only PR 2 changes, commit, push, open PR

git checkout main
git pull
git checkout -b test/task-api-coverage
# make only PR 3 changes, commit, push, open PR
```

Important: this starter archive contains the combined baseline implementation. For a genuine evaluation, create the PRs incrementally from a clean initial commit, or use the plan to split changes into separate commits/branches. Do not create empty PRs.
