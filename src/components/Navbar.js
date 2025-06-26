import { useEffect, useRef, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import MiniCart from "./MiniCart";
import MiniCurrencySelector from "./MiniCurrencySelector";
import { useCurrency } from "../context/CurrencyContext";
import cartPhoto from "../photos/Cart.svg";
import arrowUp from "../photos/arrowUp.svg";
import arrowDown from "../photos/arrowDown.svg";
import logo from "../photos/Logo.svg";

/**
 * NavBar component
 * Shows navigation links, logo, currency selector, and mini cart.
 */
const NavBar = () => {
  const { cartCount } = useCartContext();
  const [miniCurrencyOpen, setMiniCurrencyOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const cartRef = useRef(null);
  const { currency, setCurrency } = useCurrency();

  // Helper to get currency symbol by code
  const getSymbol = (code) => {
    switch (code) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gel":
        return "₾";
      default:
        return "$";
    }
  };

  // Close mini cart when clicking outside of it
  useEffect(() => {
    if (!miniCartOpen) return;
    const handleClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setMiniCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [miniCartOpen]);

  return (
    <div className="navbar">
      {/* Category navigation links */}
      <div className="navbar-categories">
        <NavLink to="/category/women" className="category-link">
          <div className="categoryName">woman</div>
        </NavLink>
        <NavLink to="/category/men" className="category-link">
          <div className="categoryName">man</div>
        </NavLink>
        <NavLink to="/category/kids" className="category-link">
          <div className="categoryName">kids</div>
        </NavLink>
      </div>

      {/* Logo in the center */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-icon" />
        </Link>
      </div>

      {/* Actions: currency selector and cart */}
      <div className="navbar-actions">
        {/* Currency selector dropdown */}
        <div className="currency-selector-wrapper">
          <button
            className="currency-selector-btn"
            onClick={() => setMiniCurrencyOpen((open) => !open)}
          >
            {getSymbol(currency)}
            <img
              src={miniCurrencyOpen ? arrowUp : arrowDown}
              alt="toggle arrow"
              className="currency-arrow"
            />
          </button>
          <MiniCurrencySelector
            open={miniCurrencyOpen}
            onClose={() => setMiniCurrencyOpen(false)}
            onSelect={setCurrency}
            selected={currency}
          />
        </div>
        {/* Cart icon and mini cart dropdown */}
        <div
          className="navbar-cart"
          style={{ position: "relative" }}
          ref={cartRef}
        >
          <div
            className="cart-icon"
            onClick={() => setMiniCartOpen((open) => !open)}
            style={{ cursor: "pointer" }}
          >
            <img src={cartPhoto} alt="Cart" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <MiniCart
            open={miniCartOpen}
            onClose={() => setMiniCartOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
