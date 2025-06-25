import React from "react";
import { useLocation } from "react-router-dom";

const steps = [
  { label: "Cart", path: "/cart" },                
  { label: "Details", path: "/ShippingInfo" },     
  { label: "Shipping", path: "/ShippingMethod" },  
  { label: "Payment", path: "/Payment" },
];

const CheckoutTracker = () => {
  const location = useLocation();
  const currentStep = steps.findIndex(
    step => location.pathname.toLowerCase().startsWith(step.path.toLowerCase())
  );

  return (
    <nav className="checkout-tracker">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <span
            className={
              idx === 0
                ? "tracker-previous" 
                : idx < currentStep
                ? "tracker-previous"
                : idx === currentStep
                ? "tracker-current"
                : "tracker-next"
            }
          >
            {step.label}
          </span>
          {idx < steps.length - 1 && (
            <span className="tracker-separator">{'>'}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CheckoutTracker;