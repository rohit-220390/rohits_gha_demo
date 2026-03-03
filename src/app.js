const express = require('express');
const { calculate } = require('./calculator');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/calculate', (req, res) => {
  const { op, a, b } = req.query;

  try {
    const result = calculate(op, a, b);
    return res.status(200).json({
      operation: op,
      a: Number(a),
      b: Number(b),
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = app;
