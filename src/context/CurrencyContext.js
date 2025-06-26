import { createContext, useContext, useState } from "react";

// Create a context for currency selection
const CurrencyContext = createContext();

/**
 * CurrencyProvider component
 * Provides currency state and setter to the app via context.
 */
export const CurrencyProvider = ({ children }) => {
  // State for selected currency (default: USD)
  const [currency, setCurrency] = useState("usd");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Custom hook to use the currency context
 */
export const useCurrency = () => useContext(CurrencyContext);
