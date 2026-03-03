const request = require('supertest');
const app = require('../src/app');

describe('app routes', () => {
  test('GET /health returns ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET /api/calculate returns result', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ op: 'add', a: 2, b: 3 });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(5);
  });

  test('GET /api/calculate returns 400 for bad op', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ op: 'mod', a: 10, b: 2 });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('Unsupported operation');
  });
});
