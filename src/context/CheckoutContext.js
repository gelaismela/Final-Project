import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutInfo, setCheckoutInfo] = useState({
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    firstName: "",
    lastName: "",
    paymentMethod: "", // <-- add this line
  });

  const setPaymentMethod = (method) => {
    setCheckoutInfo((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  return (
    <CheckoutContext.Provider value={{ checkoutInfo, setCheckoutInfo, setPaymentMethod }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}