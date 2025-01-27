import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [isNavbarShowing, setNavbarShowing] = useState(false);
  const [location] = useLocation();

  const toggleNavbar = () => {
    setNavbarShowing(!isNavbarShowing);
  };

  useEffect(() => {
    setNavbarShowing(false);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
            E-Shop
          </Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarShowing ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/register"
                className={`nav-link ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/profile"
                className={`nav-link ${location === '/profile' ? 'active' : ''}`}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/cart"
                className={`nav-link ${location === '/cart' ? 'active' : ''}`}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
