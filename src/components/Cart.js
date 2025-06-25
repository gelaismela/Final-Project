import React, { useState } from "react";
import useCart from "../hooks/UseCart";
import useFetch from "../hooks/UseFetch";
import "../styles/Cart.css";
import NavBar from "./Navbar";

const Cart = () => {
  const apiUrl = "http://localhost:8000";
  const {
    cartItems,
    cartCount,
    error: cartError,
    addItem,
    deleteItem,
  } = useCart(apiUrl);
  const {
    data: products,
    isPending,
    error: fetchError,
  } = useFetch(`${apiUrl}/products`);

  const [selectedSizes, setSelectedSizes] = useState({});

  if (isPending) return <div>Loading...</div>;
  if (fetchError || cartError)
    return <div>Error: {fetchError || cartError}</div>;
  if (!products || !cartItems) return null;

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

  const totalPrice = cartWithDetails
    .reduce((sum, item) => sum + item.total, 0)
    .toFixed(2);

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <div className="cart-container">
      <NavBar />
      <h2 className="cart-title">CART</h2>

      {cartWithDetails.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-info">
            <h3>{item.name}</h3>
            <h4>{item.gender}</h4>

            <div className="cart-item-price">${item.price.toFixed(2)}</div>

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
            </div>
          </div>

          {/* Item Preview */}
          <div className="item-preview">
            {/* Quantity Controls */}
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

            {/* Product Image */}
            <div className="cart-image">
              <img src={item.photo} alt={item.name} />
            </div>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p>
          Quantity: <strong>{cartCount}</strong>
        </p>
        <p>
          Total: <strong>${totalPrice}</strong>
        </p>

        <button className="continue-button">CONTINUE</button>
      </div>
    </div>
  );
};

export default Cart;
