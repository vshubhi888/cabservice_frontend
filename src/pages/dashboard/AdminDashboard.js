import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';

export default function AdminDashboard() {
  const { cabs, drivers, employees, loading, fetchAllData } = useDashboard();

  useEffect(() => {
    if (cabs.length === 0 && drivers.length === 0 && employees.length === 0) {
      fetchAllData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient bg-primary text-white text-center">
          <h2 className="mb-0 fw-bold">Admin Dashboard</h2>
        </div>
        <div className="card-body">
          <div className="row text-center mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-info shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-info fw-bold">Total Employees</h5>
                  <p className="card-text display-6">{employees.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">Total Drivers</h5>
                  <p className="card-text display-6">{drivers.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bold">Total Bookings</h5>
                  <p className="card-text display-6">210</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-danger shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-danger fw-bold">Active Cabs</h5>
                  <p className="card-text display-6">{cabs.filter(cab => cab.isActive).length}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3 fw-bold text-primary">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
            <button className="btn btn-outline-primary rounded-pill px-4 fw-bold">Manage Users</button>
            <button className="btn btn-outline-success rounded-pill px-4 fw-bold">Manage Drivers</button>
            <button className="btn btn-outline-warning rounded-pill px-4 fw-bold">View Bookings</button>
            <button className="btn btn-outline-danger rounded-pill px-4 fw-bold">Manage Cabs</button>
            <Link to="/cab" className="btn btn-primary rounded-pill px-4 fw-bold">
              Register New Cab
            </Link>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-info text-white fw-bold text-center">All Employees</div>
                <ul className="list-group list-group-flush">
                  {employees.map(emp => (
                    <li key={emp._id} className="list-group-item">
                      <strong>{emp.name}</strong> <span className="text-muted">({emp.email})</span>
                      <div className="small text-secondary">{emp.phone}</div>
                    </li>
                  ))}
                  {employees.length === 0 && <li className="list-group-item text-center">No employees found.</li>}
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-white fw-bold text-center">All Drivers</div>
                <ul className="list-group list-group-flush">
                  {drivers.map(driver => (
                    <li key={driver._id} className="list-group-item">
                      <strong>{driver.name}</strong> <span className="text-muted">({driver.email})</span>
                      <div className="small text-secondary">{driver.phone}</div>
                    </li>
                  ))}
                  {drivers.length === 0 && <li className="list-group-item text-center">No drivers found.</li>}
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-danger text-white fw-bold text-center">All Cabs</div>
                {loading ? (
                  <div className="text-center my-4">Loading cabs...</div>
                ) : (
                  <ul className="list-group list-group-flush">
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
                    {cabs.length === 0 && <li className="list-group-item text-center">No cabs found.</li>}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}