import React from 'react';

export default function DriverDashboard(){
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">Driver Dashboard</h2>
        </div>
        <div className="card-body">
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