const shippingPrices = {
  standard: 0,
  express: 4.99,
};

export function getShippingCost(method = "standard", currency = "usd") {
  const rates = {
    usd: 1,
    eur: 0.92,
    gel: 2.7,
  };
  const price = shippingPrices[method.toLowerCase()] ?? 0;
  return price * (rates[currency] || 1);
}
