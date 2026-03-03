function calculate(op, a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    throw new Error('Inputs must be valid numbers, use variable name as \'a\' and \'b\' only');
  }

  switch (op) {
    case 'add':
      return numA + numB;
    case 'subtract':
      return numA - numB;
    case 'multiply':
      return numA * numB;
    case 'divide':
      if (numB === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return numA / numB;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

module.exports = {
  calculate,
};
