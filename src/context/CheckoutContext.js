import React, { createContext, useContext, useState } from "react";

// Create a context for checkout information
const CheckoutContext = createContext();

/**
 * CheckoutProvider component
 * Provides checkout state and actions to the app via context.
 */
export function CheckoutProvider({ children }) {
  // State for all checkout-related info
  const [checkoutInfo, setCheckoutInfo] = useState({
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    firstName: "",
    lastName: "",
    paymentMethod: "", // Stores selected payment method
  });

  // Helper to set payment method
  const setPaymentMethod = (method) => {
    setCheckoutInfo((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{ checkoutInfo, setCheckoutInfo, setPaymentMethod }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

/**
 * Custom hook to use the checkout context
 */
export function useCheckout() {
  return useContext(CheckoutContext);
}
