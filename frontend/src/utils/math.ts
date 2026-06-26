import Decimal from 'decimal.js';

/**
 * Robustly calculate the product of two numbers (e.g. quantity * rate)
 */
export const multiply = (a: number | string, b: number | string): number => {
  try {
    return new Decimal(a || 0).times(new Decimal(b || 0)).toNumber();
  } catch {
    return 0;
  }
};

/**
 * Robustly calculate the sum of an array of numbers
 */
export const sum = (numbers: (number | string)[]): number => {
  try {
    return numbers.reduce<number>((acc, curr) => {
      return new Decimal(acc).plus(new Decimal(curr || 0)).toNumber();
    }, 0);
  } catch {
    return 0;
  }
};

/**
 * Calculate the tax amount given a base amount and a percentage
 * e.g. base = 100, percentage = 18 => 18
 */
export const calculateTax = (base: number | string, percentage: number | string): number => {
  try {
    return new Decimal(base || 0).times(new Decimal(percentage || 0)).dividedBy(100).toNumber();
  } catch {
    return 0;
  }
};

/**
 * Robust addition
 */
export const add = (a: number | string, b: number | string): number => {
  try {
    return new Decimal(a || 0).plus(new Decimal(b || 0)).toNumber();
  } catch {
    return 0;
  }
};

/**
 * Robust division
 */
export const divide = (a: number | string, b: number | string): number => {
  try {
    const divisor = new Decimal(b || 0);
    if (divisor.isZero()) return 0;
    return new Decimal(a || 0).dividedBy(divisor).toNumber();
  } catch {
    return 0;
  }
};
