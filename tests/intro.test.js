import { describe, it, expect } from "vitest";
import {
  fizzBuzz,
  max,
  calculateAverage,
  getProductOfNums,
  factorial,
} from "../src/intro";

describe("max", () => {
  it("should return teh first augument if it is greater than second", () => {
    expect(max(2, 1)).toBe(2);
  });

  it("should return teh second augument if it is greater than first", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return teh first augument if both are equals", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fizzbuzz", () => {
  it("should return fizzbuzz if n is divisable by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return fizz if n is divisable by 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("should return buzz if n is divisable by 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("should return string if n is not divisable by any of them", () => {
    expect(fizzBuzz(8)).toBe("8");
  });
});

describe("calculateAverage", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should calculate the average with single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should calculate the average with two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it("should calculate the average with three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("getProductOfNums", () => {
  it("should return NaN if not input provided", () => {
    expect(getProductOfNums([])).toBe(NaN);
  });

  it("should return the 0th element if one element is provided", () => {
    expect(getProductOfNums([2])).toBe(2);
  });

  it("should return product of two number", () => {
    expect(getProductOfNums([1, 2])).toBe(2);
  });

  it("should return product of three number", () => {
    expect(getProductOfNums([1, 2, 3])).toBe(6);
  });
});

describe("factorial", () => {
  it("should return undefined if input is less than 0", () => {
    expect(factorial(-1)).toBe(undefined);
  });

  it("should return 120 if input is 5", () => {
    expect(factorial(5)).toBe(120);
  });
});
