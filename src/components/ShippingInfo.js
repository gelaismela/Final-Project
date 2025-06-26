import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ShippingInfo.css";
import CheckoutTracker from "../hooks/CheckoutTracker";
import { useCheckout } from "../context/CheckoutContext";
import OrderSummary from "./OrderSummary";

/**
 * ShippingInfo component
 * Collects and validates shipping/contact information.
 */
function ShippingInfo() {
  const navigate = useNavigate();
  const { setCheckoutInfo } = useCheckout();

  // Form state for shipping/contact info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italy",
    saveInfo: false,
    shippingNote: "",
  });

  // Validation error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    country: "",
    city: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const Errors = {};

    Object.keys(errors).forEach((key) => (Errors[key] = ""));

    if (!formData.firstName.trim()) {
      Errors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      Errors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      Errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Errors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.address.trim()) {
      Errors.address = "Address is required";
      isValid = false;
    }
    if (!formData.postalCode.trim()) {
      Errors.postalCode = "Postal code is required";
      isValid = false;
    }
    if (!formData.country) {
      Errors.country = "Country is required";
      isValid = false;
    }
    if (!formData.city.trim()) {
      Errors.city = "City is required";
      isValid = false;
    }

    setErrors(Errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCheckoutInfo(formData); // Save info to context
      navigate("/ShippingMethod"); // Go to next step
    } else {
      console.log("Validation failed", errors, formData);
    }
  };

  return (
    <div className="checkout-page">
      <div className="shipping-section">
        {/* Checkout progress tracker */}
        <nav className="checkout-tracker">
          <CheckoutTracker />
        </nav>
        <form onSubmit={handleSubmit} className="shipping-form">
          {/* Contact section */}
          <div className="contact-section">
            <h2>Contact</h2>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Email or mobile phone number"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping address section */}
          <div className="shipping-address-section">
            <h2>Shipping Address</h2>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="Name"
                />
                {errors.firstName && (
                  <div className="error-message">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Second Name"
                />
                {errors.lastName && (
                  <div className="error-message">{errors.lastName}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
                placeholder="Address and number"
              />
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>
            <div className="form-group">
              <textarea
                id="shippingNote"
                name="shippingNote"
                value={formData.shippingNote}
                onChange={handleChange}
                placeholder="Shipping note (optional)"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "error" : ""}
                  placeholder="City"
                />
                {errors.city && (
                  <div className="error-message">{errors.city}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? "error" : ""}
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <div className="error-message">{errors.postalCode}</div>
                )}
              </div>
              <div className="form-group">
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                >
                  <option value=""> Province</option>
                  <option value="Imereti">Imereti</option>
                  <option value="Samegrelo">Samegrelo</option>
                  <option value="Xevsureti">Xevsureti</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? "error" : ""}
              >
                <option value="Italy">Italy</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
              {errors.country && (
                <div className="error-message">{errors.country}</div>
              )}
            </div>
            <div className="save-info">
              <label>
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                Save this information for a future fast checkout
              </label>
            </div>
          </div>

          {/* Form actions */}
          <div className="form-actions">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/cart")}
            >
              Back to cart
            </button>
            <button type="submit" className="continue-button">
              Go to shipping
            </button>
          </div>
        </form>
      </div>
      {/* Order summary sidebar */}
      <OrderSummary />
    </div>
  );
}

export default ShippingInfo;
