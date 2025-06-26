import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";
import CheckoutTracker from "../hooks/CheckoutTracker";
import { useCheckout } from "../context/CheckoutContext";
import cardImg from "../photos/card.png";
import infoImg from "../photos/i.png";
import lockImg from "../photos/lock.png";
import OrderSummary from "./OrderSummary";

/**
 * PaymentPage component
 * Handles payment form, validation, and shows order summary.
 */
function PaymentPage() {
  const navigate = useNavigate();
  const { checkoutInfo } = useCheckout();

  // Payment form state
  const [fields, setFields] = useState({
    cardNumber: "",
    holderName: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Prepare summary info
  const contact = checkoutInfo.email;
  const address = `${checkoutInfo.address}, ${checkoutInfo.postalCode}, ${checkoutInfo.city}, ${checkoutInfo.province} ${checkoutInfo.country}`;
  const method = checkoutInfo.shippingMethod || "Standard Shipping - FREE";

  // Handle input changes
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // Validate and handle payment form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Card number: 16 digits, spaces allowed
    if (!fields.cardNumber.trim()) {
      newErrors.cardNumber = "Card number required";
    } else if (!/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/.test(fields.cardNumber.trim())) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }

    // Holder name: at least two words, letters and spaces only
    if (!fields.holderName.trim()) {
      newErrors.holderName = "Holder name required";
    } else if (!/^[A-Za-z]+ [A-Za-z ]+$/.test(fields.holderName.trim())) {
      newErrors.holderName = "Enter first and last name";
    }

    // Expiration: MM/YY, month 01-12
    if (!fields.expiration.trim()) {
      newErrors.expiration = "Expiration required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fields.expiration.trim())) {
      newErrors.expiration = "Use MM/YY format";
    }

    // CVV: 3 or 4 digits
    if (!fields.cvv.trim()) {
      newErrors.cvv = "CVV required";
    } else if (!/^\d{3,4}$/.test(fields.cvv.trim())) {
      newErrors.cvv = "Enter a valid CVV";
    }

    setErrors(newErrors);

    // If no errors, show payment confirmation
    if (Object.keys(newErrors).length === 0) {
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-main">
        {/* Checkout progress tracker */}
        <nav className="checkout-tracker">
          <CheckoutTracker />
        </nav>
        {paymentSuccess ? (
          // Payment confirmation section
          <div className="confirmation-section">
            <div className="confirmation-content">
              <img
                src={require("../photos/checkmark.png")}
                alt="Confirmed"
                className="confirmation-checkmark"
              />
              <h2 className="confirmation-title">Payment Confirmed</h2>
              <div className="confirmation-order">
                ORDER <span className="order-number">#2039</span>
              </div>
              <button
                className="back-to-shopping"
                onClick={() => navigate("/category/women")}
              >
                Back to shopping
              </button>
            </div>
          </div>
        ) : (
          // Payment form section
          <div className="shipping-section">
            {/* Shipping/contact summary */}
            <div className="shipping-summary-box">
              <div>
                <span style={{ color: "#888" }}>Contact</span>
                <div>{contact}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ color: "#888" }}>Ship to</span>
                <div>{address}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ color: "#888" }}>Method</span>
                <div>{method}</div>
              </div>
            </div>

            <h2 style={{ marginTop: "32px" }}>Payment method</h2>
            <form className="payment-method-form" onSubmit={handleSubmit}>
              <div className="payment-method-header">
                <img src={cardImg} alt="card" className="payment-method-icon" />
                <span className="payment-method-title">Credit Card</span>
              </div>
              <div className="payment-fields">
                {/* Card number input */}
                <div className="payment-field with-icon">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={fields.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? "error" : ""}
                  />
                  <img
                    src={lockImg}
                    alt="lock"
                    className="payment-field-icon"
                  />
                  {errors.cardNumber && (
                    <div className="error-message">{errors.cardNumber}</div>
                  )}
                </div>
                {/* Holder name input */}
                <div className="payment-field">
                  <input
                    type="text"
                    name="holderName"
                    placeholder="Holder Name"
                    value={fields.holderName}
                    onChange={handleChange}
                    className={errors.holderName ? "error" : ""}
                  />
                  {errors.holderName && (
                    <div className="error-message">{errors.holderName}</div>
                  )}
                </div>
                {/* Expiration and CVV inputs */}
                <div className="payment-field-row">
                  <div className="payment-field">
                    <input
                      type="text"
                      name="expiration"
                      placeholder="Expiration (MM/YY)"
                      value={fields.expiration}
                      onChange={handleChange}
                      className={errors.expiration ? "error" : ""}
                    />
                    {errors.expiration && (
                      <div className="error-message">{errors.expiration}</div>
                    )}
                  </div>
                  <div className="payment-field" style={{ marginLeft: 12 }}>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={fields.cvv}
                      onChange={handleChange}
                      className={errors.cvv ? "error" : ""}
                    />
                    <img
                      src={infoImg}
                      alt="info"
                      className="payment-field-icon"
                    />
                    {errors.cvv && (
                      <div className="error-message">{errors.cvv}</div>
                    )}
                  </div>
                </div>
              </div>
              {/* Form actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="back-button"
                  onClick={() => navigate("/ShippingMethod")}
                >
                  Back to Shipping
                </button>
                <button type="submit" className="continue-button">
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Order summary sidebar */}
      <OrderSummary
        showShipping={true}
        shippingCost={checkoutInfo.shippingCost || 0}
      />
    </div>
  );
}

export default PaymentPage;
