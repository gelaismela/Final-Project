import { useState, useEffect } from "react";

const useCart = (apiUrl) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { cartItems, cartCount, error, addItem, deleteItem };
};

export default useCart;
