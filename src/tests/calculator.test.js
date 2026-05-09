const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator - parameterized basic operations', () => {
  test.each([
    [2, 3, 5],
    [0, 0, 0],
    [-1, -2, -3],
    [1.5, 2.25, 3.75],
    [1e6, 1e6, 2e6]
  ])('add(%p, %p) = %p', (a, b, expected) => {
    expect(add(a, b)).toBeCloseTo(expected);
  });

  test.each([
    [10, 4, 6],
    [0, 5, -5],
    [-5, -5, 0],
    [5.5, 2.5, 3]
  ])('subtract(%p, %p) = %p', (a, b, expected) => {
    expect(subtract(a, b)).toBeCloseTo(expected);
  });

  test.each([
    [45, 2, 90],
    [0, 123, 0],
    [-3, 3, -9],
    [1.5, 2, 3]
  ])('multiply(%p, %p) = %p', (a, b, expected) => {
    expect(multiply(a, b)).toBeCloseTo(expected);
  });

  test.each([
    [20, 5, 4],
    [7, 2, 3.5],
    [-9, 3, -3],
    [1.5, 0.5, 3]
  ])('divide(%p, %p) = %p', (a, b, expected) => {
    expect(divide(a, b)).toBeCloseTo(expected);
  });
});

describe('Calculator - example operations from image', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
});

describe('Calculator - edge cases and properties', () => {
  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('add is commutative', () => {
    const pairs = [[2,3],[0,5],[-1,4],[1.5,2.5]];
    pairs.forEach(([a,b]) => expect(add(a,b)).toBeCloseTo(add(b,a)));
  });

  test('multiply is commutative and zero behavior', () => {
    const pairs = [[2,3],[0,5],[-1,4]];
    pairs.forEach(([a,b]) => expect(multiply(a,b)).toBeCloseTo(multiply(b,a)));
    expect(multiply(0, 12345)).toBe(0);
  });

  test('handles NaN inputs by returning NaN', () => {
    expect(Number.isNaN(add(NaN, 1))).toBe(true);
    expect(Number.isNaN(subtract(1, NaN))).toBe(true);
    expect(Number.isNaN(multiply(NaN, 2))).toBe(true);
    expect(Number.isNaN(divide(NaN, 2))).toBe(true);
  });

  test('floating point precision for common cases', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    expect(divide(1, 3)).toBeCloseTo(0.3333333, 6);
  });
});
