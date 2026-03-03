const { calculate } = require('../src/calculator');

describe('calculate()', () => {
  test('adds two numbers', () => {
    expect(calculate('add', 5, 3)).toBe(8);
  });

  test('subtracts two numbers', () => {
    expect(calculate('subtract', 10, 4)).toBe(6);
  });

  test('multiplies two numbers', () => {
    expect(calculate('multiply', 7, 6)).toBe(42);
  });

  test('throws for divide by zero', () => {
    expect(() => calculate('divide', 10, 0)).toThrow('Division by zero is not allowed');
  });

  test('throws for unsupported operation', () => {
    expect(() => calculate('power', 2, 3)).toThrow('Unsupported operation: power');
  });
});
