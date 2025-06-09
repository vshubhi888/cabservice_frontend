import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from "../src/pages/Signup";
import Login from "../src/pages/Login";
import './App.css';;

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Cab Service</Link>
            <div>
              <Link className="nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div className="mt-5"><h2>Welcome to Cab Service</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;