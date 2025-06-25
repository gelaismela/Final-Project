import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import "../styles/MiniCart.css";
import "../components/Cart";
import { useCurrency } from "../context/CurrencyContext";
import { useCartContext } from "../context/CartContext"; // 1. Import context

// 2. Currency symbol and conversion helpers
const currencyData = {
  usd: { symbol: "$", rate: 1 },
  eur: { symbol: "€", rate: 0.92 },
  gel: { symbol: "₾", rate: 2.7 },
};

function convertPrice(price, currency) {
  const { rate } = currencyData[currency] || currencyData.usd;
  return price * rate;
}

const MiniCart = ({ open, onClose }) => {
  const apiUrl = "http://localhost:8000";
  const { cartItems, cartCount, addItem, deleteItem } = useCartContext(); // <-- Use context here
  const { data: products, isPending } = useFetch(`${apiUrl}/products`);
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});
  const { currency } = useCurrency();
  const symbol = currencyData[currency]?.symbol || "$";

  if (isPending || !products || !cartItems) return null;

  const grouped = cartItems.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {});

  const cartWithDetails = Object.entries(grouped)
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return null;
      return {
        ...product,
        quantity,
        total: quantity * product.price,
      };
    })
    .filter(Boolean);

  // Calculate total in selected currency
  const totalPrice = cartWithDetails
    .reduce((sum, item) => sum + convertPrice(item.total, currency), 0)
    .toFixed(2);

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <div className={`mini-cart-dropdown${open ? " open" : ""}`}>
      <div className="mini-cart-header">
        <strong>My Bag, {cartCount} items</strong>
        <button className="mini-cart-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="mini-cart-items">
        {cartWithDetails.map((item) => (
          <div className="mini-cart-item" key={item.id}>
            <div className="mini-cart-item-details">
              <div>{item.name}</div>
              <div className="mini-cart-item-price">
                {symbol}
                {convertPrice(item.price, currency).toFixed(2)}
              </div>
              <div className="mini-cart-sizes">
                <span>Size:</span>
                <div className="mini-cart-size-buttons">
                  {item.sizes &&
                    item.sizes.map((size) => (
                      <button
                        key={size}
                        className={`mini-cart-size-btn${
                          selectedSizes[item.id] === size ? " active" : ""
                        }`}
                        onClick={() => handleSizeClick(item.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="mini-cart-item-preview">
              <div className="mini-cart-quantity-controls">
                <button onClick={() => addItem(item.id, 1)}>+</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    const cartItem = cartItems.find(
                      (ci) => ci.productId === item.id
                    );
                    if (cartItem) deleteItem(cartItem.id);
                  }}
                >
                  −
                </button>
              </div>
              <img src={item.photo} alt={item.name} className="mini-cart-img" />
            </div>
          </div>
        ))}
      </div>

      <div className="mini-cart-footer">
        <div className="mini-cart-total">
          <span>Total:</span>
          <span>
            {symbol}
            {totalPrice}
          </span>
        </div>
        <div className="mini-cart-footer-buttons">
          <NavLink
            to="/cart"
            className="mini-cart-viewbag"
            onClick={onClose}
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            VIEW BAG
          </NavLink>
          <NavLink
            to="/shippinginfo"
            className="mini-cart-checkout"
            onClick={onClose}
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            CHECK OUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
