import { getCoupons } from "../src/core";
import { describe, it, expect } from "vitest";

describe("getCoupons", () => {
  it("should return an array", () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBeTruthy();
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return a array of coupons", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).haveOwnProperty("code");
      expect(coupon).haveOwnProperty("discount");
    });
  });

  it("should have eky with proper data type", () => {
    const coupons = getCoupons();

    expect(typeof coupons[0].code).toBe("string");
    expect(typeof coupons[0].discount).toBe("number");
  });
});
