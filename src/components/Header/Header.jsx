import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Header.module.css";

import logo from "/src/assets/icons/logo.svg";
import cartIcon from "/src/assets/icons/cart.svg";
import menuIcon from "/src/assets/icons/menu.svg";


export default function Header() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const nav = [
    { to: "/", label: "Main Page", end: true },
    { to: "/categories", label: "Categories" },
    { to: "/products", label: "All Products" },
    { to: "/sales", label: "Sales" },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Pet Shop Logo" width="70" height="70" />
        </Link>

        {/* Burger */}
        <button className={styles.burger} onClick={() => setOpen(!open)}>
          {open ? (
            "✕"
          ) : (
            <img src={menuIcon} width="48" height="48" alt="Menu" />
          )}
        </button>

        {/* Desktop Nav */}
        <nav className={`${styles.navDesktop}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Cart */}
        <Link
          to="/cart"
          className={styles.cartDesktop}
          style={{ position: "relative" }}
        >
          <img src={cartIcon} width="48" height="48" alt="Cart" />

          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </Link>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileTop}>
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="Pet Shop Logo" width="70" height="70" />
            </Link>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <nav className={styles.navMobile}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Cart block */}
          <Link
            to="/cart"
            className={styles.cartMobile}
            onClick={() => setOpen(false)}
            style={{ position: "relative" }}
          >
            <img src={cartIcon} width="40" alt="Cart" />

            {cartCount > 0 ? (
              <p>{cartCount} items in cart</p>
            ) : (
              <p>Your cart is empty</p>
            )}

            {cartCount > 0 && (
              <span className={styles.cartBadgeMobile}>{cartCount}</span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}