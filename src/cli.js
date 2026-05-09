#!/usr/bin/env node
// Node.js CLI calculator
// Supports: addition (+), subtraction (-), multiplication (*), division (/)
// Usage: node src/cli.js <number> <operator> <number>
// Examples:
//   node src/cli.js 2 + 3
//   node src/cli.js multiply 7 8

const { add, subtract, multiply, divide } = require('./calculator');

function usage() {
  console.error('Usage: node src/cli.js <a> <op> <b>');
  console.error('Operators: +, -, *, /  or add, subtract, multiply, divide');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 3) usage();

const a = Number(args[0]);
const op = args[1];
const b = Number(args[2]);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Invalid number(s) provided');
  process.exit(2);
}

try {
  let result;
  switch (op) {
    case '+':
    case 'add':
      result = add(a, b);
      break;
    case '-':
    case 'subtract':
      result = subtract(a, b);
      break;
    case '*':
    case 'x':
    case 'X':
    case 'multiply':
      result = multiply(a, b);
      break;
    case '/':
    case 'divide':
      result = divide(a, b);
      break;
    default:
      console.error('Unsupported operator:', op);
      usage();
  }
  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(3);
}
