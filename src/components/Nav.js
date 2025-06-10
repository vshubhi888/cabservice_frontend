import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Cab Service</Link>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}