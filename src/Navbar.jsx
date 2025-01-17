import React, { useState } from 'react';
// import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [isNavbarShowing, setNavbarShowing] = useState(false);
  const [location] = useLocation();

  // Toggle the collapse state
  const toggleNavbar = () => {
    setNavbarShowing(!isNavbarShowing);
  };

  // Sync the collapse state with screen size
  // useEffect(() => {
  //   const syncNavbarState = () => {
  //     setNavbarShowing(window.innerWidth >= 992); // Show if larger than 992px, otherwise don't show
  //   };

  // syncNavbarState(); 
  // Run on mount to set the initial state

  // Listen for window resize events
  // window.addEventListener('resize', syncNavbarState);

  // Cleanup the listener on unmount
  //   return () => window.removeEventListener('resize', syncNavbarState);
  // }, []);

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

        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={`nav-link ${location === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/register"
                className={`nav-link btn btn-primary text-white ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}
