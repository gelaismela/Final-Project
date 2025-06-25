import { useEffect, useRef, useState } from "react";
import { useCartContext } from "../context/CartContext"; // <-- use context!
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import MiniCart from "./MiniCart";
import MiniCurrencySelector from "./MiniCurrencySelector";
import { useCurrency } from "../context/CurrencyContext";
import cartPhoto from "../photos/Cart.svg"; // Import cart icon
import arrowUp from "../photos/arrowUp.svg"; // Import arrow up icon
import arrowDown from "../photos/arrowDown.svg"; // Import arrow down icon
import logo from "../photos/Logo.svg"; // Import logo icon

const NavBar = () => {
  const { cartCount } = useCartContext(); // <-- use context!
  const [miniCurrencyOpen, setMiniCurrencyOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const cartRef = useRef(null);
  const { currency, setCurrency } = useCurrency();

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

      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-icon" />
        </Link>
      </div>

      <div className="navbar-actions">
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
