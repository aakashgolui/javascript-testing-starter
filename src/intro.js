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
