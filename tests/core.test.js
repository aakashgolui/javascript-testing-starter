import {
  calculateDiscount,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";
import { describe, it, expect } from "vitest";

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
      /validation successful/i
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
  it("should return false if price is outside of range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBeFalsy();
    expect(isPriceInRange(200, 0, 100)).toBeFalsy();
  });

  it("should return true if price is equal to min or max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true if price is within the range", () => {
    expect(isPriceInRange(20, 0, 100)).toBe(true);
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
    expect(isValidUsername("akashgolui")).toBe(true);
  });

  it("should return invalid if username is not a string", () => {
    expect(isValidUsername(0)).toMatch(/invalid/i);
  });
});
