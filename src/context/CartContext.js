import { createContext, useContext, useState, useEffect } from "react";
import useCart from "../hooks/UseCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const apiUrl = "http://localhost:8000";
  const { cartItems, cartCount, addItem, deleteItem, error } = useCart(apiUrl);

  // Optionally, you can add more logic here if needed

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addItem, deleteItem, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
