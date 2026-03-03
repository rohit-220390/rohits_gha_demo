# Node.js Demo App (CI/CD with GitHub Actions)

A simple Node.js + Express application for demo purposes.

## Features
- Health endpoint: `GET /health`
- Calculator endpoint: `GET /api/calculate?op=add&a=2&b=3`
- Unit tests with Jest
- API tests with Supertest
- CI/CD workflow using GitHub Actions

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```
3. Start app:
   ```bash
   npm start
   ```
4. Open:
   - `http://localhost:3000/health`
   - `http://localhost:3000/api/calculate?op=multiply&a=5&b=7`

## Scripts
- `npm start` - Run server
- `npm dev` - Run server in watch mode
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage

## CI/CD Workflow
Workflow file: `.github/workflows/ci-cd.yml`

### CI Job
- Checkout code
- Setup Node.js 20
- Install dependencies (`npm ci`)
- Execute tests (`npm test`)

### CD Job (Demo)
Runs only on push to `main` after CI success:
- Package application into `build/node-demo-app.tar.gz`
- Upload package as workflow artifact

> Note: This CD stage is demo-friendly and can be replaced with deployment to Azure/AWS/GCP/VM/Kubernetes as needed.
