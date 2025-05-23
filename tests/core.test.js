import {
  calculateDiscount,
  canDrive,
  createProduct,
  fetchData,
  getCoupons,
  isPriceInRange,
  isStrongPassword,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../src/core";
import { describe, it, expect, beforeEach } from "vitest";

describe("getCoupons", () => {
  it("should return an array", () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBeTruthy();
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).haveOwnProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).haveOwnProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid price/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(0, "SAVE10")).toMatch(/invalid price/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 0)).toMatch(/invalid discount code/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return validation successful if correct input given", () => {
    expect(validateUserInput("aakashgolui", 27)).toMatch(
      /validation successful/i,
    );
  });

  it("should check invalid username", () => {
    expect(validateUserInput(10, 27)).toMatch(/invalid username/i);
    expect(validateUserInput("ag", 27)).toMatch(/invalid username/i);
  });

  it("should check invalid age", () => {
    expect(validateUserInput("akash", "27")).toMatch(/invalid age/i);
    expect(validateUserInput("akash", 17)).toMatch(/invalid age/i);
  });

  it("should return an error if username is longer than 255 characters", () => {
    expect(validateUserInput("A".repeat(256), 27)).toMatch(/invalid/i);
  });

  it("should return an error if age is greater than 100", () => {
    expect(validateUserInput("akash", 101)).toMatch(/invalid/i);
  });

  it("should return an error if both are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username/i);
    expect(validateUserInput("", 0)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it.each([
    { value: -10, result: false, scenario: "price < min" },
    { value: 0, result: true, scenario: "price = min" },
    { value: 20, result: true, scenario: "price > min and < max" },
    { value: 100, result: true, scenario: "price = max" },
    { value: 200, result: false, scenario: "price > max" },
  ])("should return $result if $scenario", ({ result, value }) => {
    expect(isPriceInRange(value, 0, 100)).toBe(result);
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  it("should return false if username length is outside of the range", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username length is equal to max and min", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });

  it("should return true if username length is within the range", () => {
    expect(isValidUsername("aakashgolui")).toBe(true);
  });

  it("should return invalid if username is not a string", () => {
    expect(isValidUsername(null)).toBe(false);
  });
});

describe("canDrive", () => {
  it("should throw error if country code is invalid", () => {
    expect(canDrive(12, "IN")).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])("should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

describe("fetchData", () => {
  it("should return a promise which will resolved to an array", async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("should push a element in the stack on using push()", () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it("should throw an error while popping an empty stack", () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it("should pop an element from the stack", () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it("should throw an error if calling peek on empty stack", () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it("should return the last element on calling peek", () => {
    stack.push(1);
    stack.push(2);

    const peekeditem = stack.peek();
    expect(peekeditem).toBe(2);
  });

  it("should return true is the stack is empty", () => {
    const isEmpty = stack.isEmpty();
    expect(isEmpty).toBe(true);
  });

  it("should return false is the stack is not empty", () => {
    stack.push(1);

    const isEmpty = stack.isEmpty();
    expect(isEmpty).toBe(false);
  });

  it("should clear the Stack on calling clear()", () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});

describe("createProduct", () => {
  it.each([
    {
      product: { price: 10 },
      expResult: false,
      message: "Name is missing",
    },
    {
      product: { name: "Akash", price: -10 },
      expResult: false,
      message: "Price is missing",
    },
  ])("should throw error if $message", ({ product, expResult }) => {
    const result = createProduct(product);

    expect(result.success).toBe(expResult);
    expect(result.error.message).toMatch(/missing/i);
    expect(result.error.code).toMatch(/invalid/i);
  });

  it("should create a product upon giving correct input", () => {
    const result = createProduct({ name: "Candy", price: 20 });

    expect(result.success).toBe(true);
    expect(result.message).toMatch(/success/i);
  });
});

describe("isStrongPassword", () => {
  it.each([
    { expResult: false, input: "akash", message: "min length is less than 8" },
    {
      expResult: false,
      input: "akashgolui",
      message: "not contain minimum one uppercase character",
    },
    {
      expResult: false,
      input: "AKASHGOLUI",
      message: "not contain minimum one lowercase character",
    },
    {
      expResult: false,
      input: "AkashGolui",
      message: "not contain minimum one numeric digit",
    },
    {
      expResult: true,
      input: "AkashGolui@123",
      message: "password is correct",
    },
  ])("should return $expResult if $message", ({ expResult, input }) => {
    expect(isStrongPassword(input)).toBe(expResult);
  });
});
