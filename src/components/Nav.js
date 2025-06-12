import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
            alt="Cab Service"
            width="36"
            className="me-2"
            style={{ marginTop: -4 }}
          />
          Cab Service
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === '/signup' ? ' active' : ''}`}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === '/login' ? ' active' : ''}`}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === '/logout' ? ' active' : ''}`}
                to="/logout"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}