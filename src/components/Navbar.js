import { useEffect, useState } from "react";
import useCart from "../hooks/UseCart";
import CartIcon from "../photos/Cart.svg";
import Logo from "../photos/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const apiUrl = "http://localhost:8000"; // 👈 Define it here
  const { cartCount } = useCart(apiUrl);

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
          <img src={Logo} alt="logo" className="logo-icon" />
        </Link>
      </div>

      <div className="navbar-actions">
        <select className="currency-selector">
          <option value="usd">$ USD</option>
          <option value="eur">€ EUR</option>
          <option value="gel">₾ GEL</option>
        </select>
        <Link to="/cart">
          <img src={CartIcon} alt="Cart" className="cart-icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
