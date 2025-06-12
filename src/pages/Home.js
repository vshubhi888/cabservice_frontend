import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 mb-3">Welcome to Cab Service</h1>
          <p className="lead">
            Fast, reliable, and safe cab booking for employees and drivers. Join us to experience seamless rides and efficient service, whether you are a passenger or a driver!
          </p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">Get Started</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg">Login</Link>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80"
            alt="Cab Service"
            className="img-fluid rounded shadow"
            style={{ maxHeight: 350 }}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col text-center">
          <h3>Why Choose Us?</h3>
          <p>
            <span role="img" aria-label="clock">⏱️</span> 24/7 Service &nbsp; | &nbsp;
            <span role="img" aria-label="shield">🛡️</span> Safe & Secure &nbsp; | &nbsp;
            <span role="img" aria-label="star">⭐</span> Trusted by 10,000+ users
          </p>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}