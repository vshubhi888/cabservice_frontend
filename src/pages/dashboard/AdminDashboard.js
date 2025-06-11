import React from 'react';

export default function AdminDashboard(){
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Admin Dashboard</h2>
        </div>
        <div className="card-body">
          <div className="row text-center mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-info">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text display-6">120</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Total Drivers</h5>
                  <p className="card-text display-6">35</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Total Bookings</h5>
                  <p className="card-text display-6">210</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-danger">
                <div className="card-body">
                  <h5 className="card-title">Active Cabs</h5>
                  <p className="card-text display-6">18</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary">Manage Users</button>
            <button className="btn btn-outline-success">Manage Drivers</button>
            <button className="btn btn-outline-warning">View Bookings</button>
            <button className="btn btn-outline-danger">Manage Cabs</button>
          </div>
        </div>
      </div>
    </div>
  );
}