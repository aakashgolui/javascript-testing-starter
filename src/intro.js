// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  let result = "";
  if (n % 3 === 0) result += "Fizz";
  if (n % 5 === 0) result += "Buzz";
  return result || n.toString();
}

export function calculateAverage(nums) {
  if (nums.length) {
    const sum = nums.reduce((acc, val) => acc + val, 0);
    return sum / nums.length;
  }
  return NaN;
}

export const getProductOfNums = (nums) => {
  if (!nums.length) return NaN;
  return nums.reduce((acc, val) => acc * val, 1);
};

export const factorial = (n) => {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;

  return n * factorial(n - 1);
};
