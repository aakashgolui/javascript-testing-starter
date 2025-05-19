import { calculateDiscount, getCoupons, validateUserInput } from "../src/core";
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
});
