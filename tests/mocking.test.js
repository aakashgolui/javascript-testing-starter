import { vi, it, expect, describe, beforeEach } from 'vitest';
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { isValidEmail, sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe('mock test suit', () => {
  it('sendText', () => {
    const sendText = vi.fn();
    sendText.mockImplementation((message) => message);

    const result = sendText('ok');

    expect(sendText).toHaveBeenCalled();
    expect(sendText).toHaveBeenCalledWith('ok');
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should return Shipping Unavailable if no quote found', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const info = getShippingInfo('UAE');
    expect(info).toMatch(/Unavailable/i);
  });

  it('should return quote on correct input', () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 200,
      estimatedDays: 2,
    });

    const info = getShippingInfo('UAE');
    expect(info).toMatch(/Shipping Cost: \$200 \(2 days\)/i);
  });
});

describe('renderPage', () => {
  it('should should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  const order = { totalAmount: 100 };
  const creditCard = { creditCardNumber: '474765' };

  it('should call the charge method with correct input', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return error if char fails', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: 'payment_error' });
  });

  it('should return success if charge successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });
});

describe('signUp', () => {
  const email = 'akash@gmail.com';
  it('should return false if email is not valid', async () => {
    const result = await signUp('abkbk');
    expect(result).toBe(false);
  });

  it('should return true if email is valid', async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it('should return sent the welcome email if email is valid', async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];

    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

describe('login', () => {
  it('should email the one-time validation code', async () => {
    const email = 'akash@gmail.com';
    const spy = vi.spyOn(security, 'generateCode');

    await login(email);

    const security_code = spy.mock.results[0].value;
    expect(sendEmail).toHaveBeenCalledWith(email, security_code.toString());
  });
});

describe('signUp', () => {
  const email = 'akash@gmail.com';

  it('should return false if email is invalid', async () => {
    const result = await signUp('a');

    expect(result).toBe(false);
  });

  it('should return true if email is valid', async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it('should send the welcome email if email is valid', async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalledOnce();
  });
});

describe('isOnline', () => {
  it('should return false if current hour is outside of opening hours', () => {
    vi.setSystemTime('2025-5-23 7:59');
    expect(isOnline()).toBe(false);

    vi.setSystemTime('2025-5-23 20:01');
    expect(isOnline()).toBe(false);
  });

  it('should return true if the current time is within opening hours', () => {
    vi.setSystemTime('2025-5-23 8:01');
    expect(isOnline()).toBe(true);

    vi.setSystemTime('2025-5-23 19:59');
    expect(isOnline()).toBe(true);
  });
});

describe('getDiscount', () => {
  it('should give 0.2 if the date is under x-max day', () => {
    vi.setSystemTime('2025-12-25 8:01');

    expect(getDiscount()).toBe(0.2);
  });

  it('should give 0 if the date is outside x-max day', () => {
    vi.setSystemTime('2025-12-26 8:01');

    expect(getDiscount()).toBe(0);
  });
});
