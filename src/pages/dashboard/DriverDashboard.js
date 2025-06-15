import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8080';

export default function DriverDashboard() {
  const [driverId, setDriverId] = useState(localStorage.getItem('driverId') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newBooking, setNewBooking] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!driverId) return;

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
    });

    newSocket.on('connect', () => {
      newSocket.emit('driverLogin', driverId);
    });

    newSocket.on('newBooking', (booking) => {
      setNewBooking(booking);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [driverId]);

  const handleAcceptBooking = async () => {
    if (!newBooking) return;
    try {
      await fetch(`http://localhost:8080/api/bookings/${newBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });
      setNewBooking(null);
      alert('Booking accepted!');
    } catch (err) {
      alert('Failed to accept booking.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);

        // Fetch driver profile to get driverId
        const profileRes = await fetch('http://localhost:8080/api/users/profile', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const profile = await profileRes.json();
        if (profile.userId) {
          localStorage.setItem('driverId', profile.userId);
          setDriverId(profile.userId);
        } else {
          alert('Failed to fetch driver profile.');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Login error');
    }
  };

  if (!driverId) {
    return (
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2>Driver Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control mb-3"
          />
          <button className="btn btn-success" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">Driver Dashboard</h2>
        </div>
        <div className="card-body">
          {newBooking && (
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <div>
                <strong>New Booking!</strong><br />
                Pickup: {newBooking.pickupLocation?.address}<br />
                Drop: {newBooking.dropLocation?.address}
              </div>
              <button className="btn btn-success ms-3" onClick={handleAcceptBooking}>
                Accept Booking
              </button>
            </div>
          )}
          <div className="row text-center mb-4">
            <div className="col-md-4 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Today's Rides</h5>
                  <p className="card-text display-6">5</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Upcoming Rides</h5>
                  <p className="card-text display-6">2</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-info">
                <div className="card-body">
                  <h5 className="card-title">Total Earnings</h5>
                  <p className="card-text display-6">$120</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary">View Assigned Rides</button>
            <button className="btn btn-outline-success">Mark Ride as Complete</button>
            <button className="btn btn-outline-info">View Earnings</button>
          </div>
        </div>
      </div>
    </div>
  );
}