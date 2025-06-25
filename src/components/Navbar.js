import { useEffect, useState } from "react";
import useCart from "../hooks/UseCart";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const apiUrl = "http://localhost:8000";
  const { cartCount } = useCart(apiUrl);

  const [currency, setCurrency] = useState("usd");
  const [isOpen, setIsOpen] = useState(false);

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
          <img src="/photos/Logo.svg" alt="logo" className="logo-icon" />
        </Link>
      </div>

      <div className="navbar-actions">
        <div className="currency-selector-wrapper">
          <select
            className="currency-selector"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
          >
            <option value="usd">$ USD</option>
            <option value="eur">€ EUR</option>
            <option value="gel">₾ GEL</option>
          </select>

          <div className="currency-display">
            <span>{getSymbol(currency)}</span>
            <img
              src={isOpen ? "/photos/arrowUp.svg" : "/photos/arrowDown.svg"}
              alt="toggle arrow"
              className="currency-arrow"
            />
          </div>
        </div>

        <div className="navbar-cart">
          <Link to="/cart">
            <div className="cart-icon">
              <img src="/photos/Cart.svg" alt="Cart" />
              <span className="cart-badge">{cartCount}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
