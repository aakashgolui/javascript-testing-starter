import { vi, it, expect, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");

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

describe("renderPage", () => {
  it("should should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  const order = { totalAmount: 100 };
  const creditCard = { creditCardNumber: "474765" };

  it("should call the charge method with correct input", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return error if char fails", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });

  it("should return success if charge successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });
});
