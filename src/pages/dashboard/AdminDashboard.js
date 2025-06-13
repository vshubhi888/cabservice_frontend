import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
export default function AdminDashboard() {

  const { cabs, drivers, employees, loading, fetchAllData } = useDashboard();

  
  useEffect(() => {
    // Only fetch if data is empty (first load or after registration)
    if (cabs.length === 0 && drivers.length === 0 && employees.length === 0) {
      fetchAllData();
    }
  }, []);


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
                  <h5 className="card-title">Total Employees</h5>
                  <p className="card-text display-6">{employees.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Total Drivers</h5>
                  <p className="card-text display-6">{drivers.length}</p>
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
                  <p className="card-text display-6">{cabs.filter(cab => cab.isActive).length}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3 mb-4">
            <button className="btn btn-outline-primary">Manage Users</button>
            <button className="btn btn-outline-success">Manage Drivers</button>
            <button className="btn btn-outline-warning">View Bookings</button>
            <button className="btn btn-outline-danger">Manage Cabs</button>
            <Link to="/cab" className="btn btn-primary">
              Register New Cab
            </Link>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <h5 className="mb-3">All Employees</h5>
              <ul className="list-group">
                {employees.map(emp => (
                  <li key={emp._id} className="list-group-item">
                    <strong>{emp.name}</strong> - {emp.email} - {emp.phone}
                  </li>
                ))}
                {employees.length === 0 && <li className="list-group-item">No employees found.</li>}
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">All Drivers</h5>
              <ul className="list-group">
                {drivers.map(driver => (
                  <li key={driver._id} className="list-group-item">
                    <strong>{driver.name}</strong> - {driver.email} - {driver.phone}
                  </li>
                ))}
                {drivers.length === 0 && <li className="list-group-item">No drivers found.</li>}
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">All Cabs</h5>
              {loading ? (
                <div>Loading cabs...</div>
              ) : (
                <ul className="list-group">
                  {cabs.map(cab => (
                    <li key={cab._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <strong>{cab.cabNumber}</strong> - {cab.model} ({cab.capacity} seats)
                      </span>
                      <span className={`badge ${cab.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {cab.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </li>
                  ))}
                  {cabs.length === 0 && <li className="list-group-item">No cabs found.</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}