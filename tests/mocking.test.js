import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");

describe("mock test suit", () => {
  it("sendText", () => {
    const sendText = vi.fn();
    sendText.mockImplementation((message) => message);

    const result = sendText("ok");

    expect(sendText).toHaveBeenCalled();
    expect(sendText).toHaveBeenCalledWith("ok");
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");

    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return Shipping Unavailable if no quote found", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const info = getShippingInfo("UAE");
    expect(info).toMatch(/Unavailable/i);
  });

  it("should return quote on correct input", () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 200,
      estimatedDays: 2,
    });

    const info = getShippingInfo("UAE");
    expect(info).toMatch(/Shipping Cost: \$200 \(2 days\)/i);
  });
});
