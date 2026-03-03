# Copilot Instructions for `GHA_Demo`

## Project purpose
- This is a minimal Node.js demo app showing:
  - a small Express API,
  - unit + API tests,
  - a GitHub Actions CI/CD pipeline.

## Architecture and boundaries
- Keep request/response wiring in `src/app.js`.
- Keep business logic in `src/calculator.js` as pure functions.
- Keep runtime bootstrap in `src/server.js` only (`app.listen(...)`).
- Current flow: HTTP request (`/api/calculate`) -> parse query -> call `calculate(op, a, b)` -> JSON response.

## Existing API contract
- `GET /health` returns `200` with `{ "status": "ok" }`.
- `GET /api/calculate` expects query params `op`, `a`, `b`.
- Supported operations in `calculate`: `add`, `subtract`, `multiply`, `divide`.
- Invalid input/operation paths throw in `calculator.js` and are converted to `400` in `app.js`.

## Testing workflow (authoritative)
- Use scripts from `package.json`:
  - `npm test` -> `jest --runInBand`
  - `npm run test:coverage` -> coverage report
- Unit tests for business logic live in `tests/calculator.test.js`.
- API/integration tests live in `tests/app.test.js` and use `supertest` against `app` export.
- When changing endpoint behavior, update both calculator and app tests as needed.

## CI/CD workflow expectations
- Pipeline file: `.github/workflows/ci-cd.yml`.
- CI job must continue to run `npm ci` and `npm test` on pushes/PRs.
- CD job is demo-only: on `main`, package `src`, `package.json`, and `package-lock.json` into `build/node-demo-app.tar.gz`, then upload artifact.
- Preserve this simple artifact-based deploy pattern unless explicitly asked to implement real deployment.

## Conventions for edits
- Use CommonJS (`require`, `module.exports`) consistently.
- Prefer small, targeted changes; avoid introducing frameworks or heavy abstractions.
- Keep responses JSON-only in routes (matching current style).
- Do not add environment/config layers unless requested; this repo is intentionally minimal.

## Quick file map
- API routing: `src/app.js`
- Business logic: `src/calculator.js`
- Server entrypoint: `src/server.js`
- Tests: `tests/*.test.js`
- Pipeline: `.github/workflows/ci-cd.yml`
