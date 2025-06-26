import { useCartContext } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import useFetch from "../hooks/UseFetch";

// Currency conversion data
const currencyData = {
  usd: { symbol: "$", rate: 1 },
  eur: { symbol: "€", rate: 0.92 },
  gel: { symbol: "₾", rate: 2.7 },
};

// Helper to convert price to selected currency
function convertPrice(price, currency) {
  const { rate } = currencyData[currency] || currencyData.usd;
  return price * rate;
}

const OrderSummary = ({ showShipping = true, shippingCost = 0 }) => {
  const { cartItems } = useCartContext();
  const { currency } = useCurrency();
  const apiUrl = "http://localhost:8000";
  const { data: products } = useFetch(`${apiUrl}/products`);
  const symbol = currencyData[currency]?.symbol || "$";

  // Group cart items by productId and join with product info
  const grouped = {};
  cartItems.forEach((cartItem) => {
    if (!products) return;
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return;
    if (!grouped[product.id]) {
      grouped[product.id] = {
        ...product,
        quantity: 0,
      };
    }
    grouped[product.id].quantity += cartItem.quantity;
  });
  const cartWithDetails = Object.values(grouped);

  // Calculate subtotal and total (including shipping)
  const subtotal = cartWithDetails.reduce(
    (sum, item) => sum + convertPrice(item.price * item.quantity, currency),
    0
  );
  const total = subtotal + Number(shippingCost);

  return (
    <div className="order-summary">
      {/* List each cart item */}
      {cartWithDetails.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-image">
            <img src={item.photo} alt={item.name} className="item-image" />
            <span className="item-qty-badge">{item.quantity}</span>
          </div>
          <div className="cart-item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-price">
              {symbol}
              {convertPrice(item.price, currency).toFixed(2)}
            </div>
          </div>
        </div>
      ))}

      {/* Subtotal row */}
      <div className="summary-row">
        <div className="summary-label">Subtotal</div>
        <div className="summary-value">
          {symbol}
          {subtotal.toFixed(2)}
        </div>
      </div>

      {/* Shipping row (if enabled) */}
      {showShipping && (
        <div className="summary-row">
          <div className="summary-label">Shipping</div>
          <div className="summary-value">
            {Number(shippingCost) === 0
              ? "Free Shipping"
              : `${symbol}${Number(shippingCost).toFixed(2)}`}
          </div>
        </div>
      )}

      {/* Total row */}
      <div className="summary-row total">
        <div className="summary-label">Total</div>
        <div className="summary-value">
          {symbol}
          {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
