# Copilot Instructions for `GHA_Demo`

## Big picture
- Minimal Node.js API demo: Express app + Jest/Supertest tests + GitHub Actions CI/CD.
- Design goal is intentionally simple, so prefer small targeted edits over abstraction.
- Request flow: `GET /api/calculate` in `src/app.js` -> `calculate(op, a, b)` in `src/calculator.js` -> JSON response.

## Component boundaries (keep these strict)
- `src/app.js`: HTTP layer only (route parsing, status codes, JSON payloads).
- `src/calculator.js`: business rules as pure function(s); throw errors for invalid cases.
- `src/server.js`: runtime bootstrap only (`app.listen(...)`, port wiring).
- Keep `app` export in `src/app.js` unchanged; tests use it directly via Supertest.

## API behavior to preserve
- `GET /health` -> `200` and `{ status: 'ok' }`.
- `GET /api/calculate?op=add&a=2&b=3` -> `200` with:
  - `operation` (string),
  - `a` and `b` converted with `Number(...)`,
  - `result` from `calculate`.
- Error contract: `calculator.js` throws; `app.js` catches and returns `400` with `{ error: error.message }`.
- Supported ops today: `add`, `subtract`, `multiply`, `divide` (divide-by-zero throws).

## Dev workflow (authoritative commands)
- Install deps: `npm install` (CI uses `npm ci`).
- Run app: `npm start` (entry is `src/server.js`, default port `3000`).
- Watch mode: `npm run dev` (`node --watch src/server.js`).
- Tests: `npm test` (`jest --runInBand`), coverage: `npm run test:coverage`.

## Testing patterns in this repo
- Unit tests in `tests/calculator.test.js` validate operation behavior and thrown errors.
- API tests in `tests/app.test.js` validate status + JSON contract using `request(app)`.
- If endpoint behavior changes, update both calculator unit tests and app API tests.

## CI/CD expectations
- Workflow file: `.github/workflows/ci-cd.yml`.
- CI must keep running `npm ci` and `npm test` on push/PR.
- Demo CD on `main`: package `src`, `package.json`, `package-lock.json` into `build/node-demo-app.tar.gz` and upload artifact.

## Conventions specific to this codebase
- Use CommonJS only (`require`, `module.exports`), not ESM.
- Keep route responses JSON-only and consistent with current keys.
- Keep error message strings stable unless intentionally changing tests/contract.
- Avoid adding config/env layers or new frameworks unless explicitly requested.
