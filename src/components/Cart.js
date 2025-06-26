import React, { useState } from "react";
import useFetch from "../hooks/UseFetch";
import "../styles/Cart.css";
import NavBar from "./Navbar";
import { useCurrency } from "../context/CurrencyContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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

const Cart = () => {
  const apiUrl = "http://localhost:8000";
  // Get cart state and actions from context
  const {
    cartItems,
    cartCount,
    error: cartError,
    addItem,
    deleteItem,
  } = useCartContext();

  // Fetch all products for details
  const {
    data: products,
    isPending,
    error: fetchError,
  } = useFetch(`${apiUrl}/products`);

  // Track selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState({});
  const { currency } = useCurrency();
  const navigate = useNavigate();

  // Show loading or error states
  if (isPending) return <div>Loading...</div>;
  if (fetchError || cartError)
    return <div>Error: {fetchError || cartError}</div>;
  if (!products || !cartItems) return null;

  // Group cart items by productId and sum quantities
  const grouped = cartItems.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {});

  // Merge cart items with product details
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

  // Calculate total price in selected currency
  const totalPrice = cartWithDetails
    .reduce((sum, item) => sum + convertPrice(item.total, currency), 0)
    .toFixed(2);

  // Handle size selection for each product
  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const symbol = currencyData[currency]?.symbol || "$";

  // Check if all items have a selected size
  const allSizesSelected =
    cartWithDetails.length > 0 &&
    cartWithDetails.every((item) => selectedSizes[item.id]);

  // Handle continue button click
  const handleContinue = () => {
    if (allSizesSelected) {
      // Optionally: Save selectedSizes to context or localStorage if needed for later steps
      navigate("/shippingInfo");
    }
  };

  return (
    <div className="cart-container">
      {/* Navigation bar */}
      <NavBar />
      <h2 className="cart-title">CART</h2>

      {/* List all cart items */}
      {cartWithDetails.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-info">
            <h3>{item.name}</h3>
            <h4>{item.gender}</h4>

            {/* Show price in selected currency */}
            <div className="cart-item-price">
              {symbol}
              {convertPrice(item.price, currency).toFixed(2)}
            </div>

            {/* Size selection for each item */}
            <div className="cart-sizes">
              <p>SIZE:</p>
              <div className="size-options">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    className={`cart-size-btn ${
                      selectedSizes[item.id] === size ? "active" : ""
                    }`}
                    onClick={() => handleSizeClick(item.id, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Show error if size not selected */}
              {!selectedSizes[item.id] && (
                <div
                  className="size-error"
                  style={{ color: "red", fontSize: 12, padding: "8px 16px" }}
                >
                  Please select a size
                </div>
              )}
            </div>
          </div>

          {/* Quantity controls and product image */}
          <div className="item-preview">
            <div className="quantity-controls">
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

            <div className="cart-image">
              <img src={item.photo} alt={item.name} />
            </div>
          </div>
        </div>
      ))}

      {/* Cart summary and continue button */}
      <div className="cart-summary">
        <p>
          Quantity: <strong>{cartCount}</strong>
        </p>
        <p>
          Total:{" "}
          <strong>
            {symbol}
            {totalPrice}
          </strong>
        </p>

        <button
          className="continue-button"
          disabled={!allSizesSelected}
          onClick={handleContinue}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default Cart;
