import { createContext, useContext } from "react";
import useCart from "../hooks/UseCart";

// Create a context for the cart
const CartContext = createContext();

/**
 * CartProvider component
 * Provides cart state and actions to the app via context.
 */
export const CartProvider = ({ children }) => {
  const apiUrl = "http://localhost:8000";
  // Get cart state and actions from custom hook
  const { cartItems, cartCount, addItem, deleteItem, error } = useCart(apiUrl);

  // You can add more logic here if needed (e.g., persist cart, sync, etc.)

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addItem, deleteItem, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use the cart context
 */
export const useCartContext = () => useContext(CartContext);
