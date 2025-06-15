import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function DriverDashboard() {
  const [driver, setDriver] = useState(null);
  const [socket, setSocket] = useState(null);
  const [newBooking, setNewBooking] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDriver(data.user || null));
  }, []);

  useEffect(() => {
    if (driver && driver._id) {
      const newSocket = io('http://localhost:8080');
      setSocket(newSocket);
      newSocket.emit('driverLogin', driver._id);

      // Optional: Listen for driverList updates
      newSocket.on('driverList', (list) => {
        console.log('Online drivers:', list);
      });

      // Example: Listen for newBooking event
      newSocket.on('newBooking', (booking) => {
        alert(`New booking received: ${booking._id}`);
        setNewBooking(booking);
      });

      return () => newSocket.disconnect();
    }
  }, [driver]);

 const handleAcceptBooking = async () => {
    if (newBooking && driver) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8080/api/bookings/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            bookingId: newBooking._id,
            status: "accepted"
          })
        });
        setNewBooking(null);
      } catch (error) {
        console.error('Failed to accept booking:', error);
      }
    }
  };

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