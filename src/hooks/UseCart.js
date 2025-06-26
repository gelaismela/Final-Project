import { useState, useEffect } from "react";

/**
 * Custom hook for cart logic.
 * Handles fetching, adding, and deleting cart items from the API.
 * @param {string} apiUrl - The base URL for the API.
 */
const useCart = (apiUrl) => {
  // State for cart items and error messages
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the cart from the API
  const fetchCart = async () => {
    try {
      const res = await fetch(`${apiUrl}/cart`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add an item to the cart
  const addItem = async (productId, quantity = 1) => {
    try {
      const res = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete an item from the cart
  const deleteItem = async (cartItemId) => {
    try {
      const res = await fetch(`${apiUrl}/cart/${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete cart item");
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total quantity of items in the cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Expose cart state and actions
  return { cartItems, cartCount, error, addItem, deleteItem };
};

export default useCart;
