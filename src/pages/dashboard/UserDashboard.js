import React, { useEffect, useState } from 'react';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  const handleBookCab = async () => {
    if (!user) return;
    setBookingStatus(null);
    const token = localStorage.getItem('token');
    const bookingData = {
      employee: user._id,
      driver: "684f092b8151f4cdf10fe80b", // Replace with actual driver id if needed
      pickupLocation: {
        address: "123 Main Street, City Center",
        lat: 28.6139,
        lng: 77.2090
      },
      dropLocation: {
        address: "456 Park Avenue, Uptown",
        lat: 28.7041,
        lng: 77.1025
      },
      status: "pending",
      bookingTime: new Date().toISOString(),
      tripStartTime: null,
      tripEndTime: null,
      estimatedFare: 350
    };

    try {
      const res = await fetch('http://localhost:8080/api/bookings/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (res.ok) {
        setBookingStatus('Booking registered successfully!');
      } else {
        setBookingStatus(data.message || 'Booking failed.');
      }
    } catch (err) {
      setBookingStatus('Booking failed.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">User Dashboard</h2>
      
        </div>
        <div className="card-body">
          <div className="row text-center mb-4">
            <div className="col-md-4 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Upcoming Bookings</h5>
                  <p className="card-text display-6">3</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Completed Rides</h5>
                  <p className="card-text display-6">12</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Total Spent</h5>
                  <p className="card-text display-6">$250</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary" onClick={handleBookCab}>Book a Cab</button>
            <button className="btn btn-outline-success">View Bookings</button>
            <button className="btn btn-outline-info">Profile</button>
          </div>
          {bookingStatus && (
            <div className="alert mt-3" style={{ color: bookingStatus.includes('success') ? 'green' : 'red' }}>
              {bookingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};