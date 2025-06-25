import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ShippingMethod.css";
import CheckoutTracker from "../hooks/CheckoutTracker";
import { useCheckout } from "../context/CheckoutContext";
import OrderSummary from "./OrderSummary";
import { useCurrency } from "../context/CurrencyContext";
import { getShippingCost } from "../utils/getShippingCost";

function ShippingMethod() {
  const navigate = useNavigate();
  const { checkoutInfo, setCheckoutInfo } = useCheckout();
  const { currency } = useCurrency();
  const [shipping, setShipping] = useState(
    checkoutInfo.shippingMethod || "Standard"
  );

  useEffect(() => {
    let shippingMethod = shipping === "express" ? "Express" : "Standard";
    let shippingCost = getShippingCost(shipping, currency);
    setCheckoutInfo((prev) => ({
      ...prev,
      shippingMethod,
      shippingCost,
    }));
  }, [shipping, setCheckoutInfo, currency]);

  const contact = checkoutInfo.email;
  const address = `${checkoutInfo.address}, ${checkoutInfo.postalCode}, ${checkoutInfo.city}, ${checkoutInfo.province} ${checkoutInfo.country}`;

  return (
    <div className="checkout-page">
      <div className="shipping-section">
        <nav className="checkout-tracker">
          <CheckoutTracker />
        </nav>

        <div className="shipping-summary-box">
          <div>
            <span style={{ color: "#888" }}>Contact</span>
            <div>{contact}</div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ color: "#888" }}>Ship to</span>
            <div>{address}</div>
          </div>
        </div>

        <h2 style={{ marginTop: "32px" }}>Shipping method</h2>
        <form className="shipping-method-form">
          <div className="shipping-method-option">
            <label>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shipping === "standard"}
                onChange={() => setShipping("standard")}
              />
              <span className="shipping-label">Standard Shipping</span>
              <span className="shipping-price" style={{ float: "right" }}>
                Free
              </span>
            </label>
          </div>
          <div className="shipping-method-option">
            <label>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shipping === "express"}
                onChange={() => setShipping("express")}
              />
              <span className="shipping-label">Express Shipping</span>
              <span className="shipping-price" style={{ float: "right" }}>
                4.99$
              </span>
            </label>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/ShippingInfo")}
            >
              Back to details
            </button>
            <button
              type="submit"
              className="continue-button"
              onClick={() => navigate("/PaymentPage")}
            >
              Go to Payment
            </button>
          </div>
        </form>
      </div>
      <OrderSummary />
    </div>
  );
}

export default ShippingMethod;
