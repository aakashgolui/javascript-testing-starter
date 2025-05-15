import { describe, it, expect } from "vitest";
import { fizzBuzz, max } from "../src/intro";

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
