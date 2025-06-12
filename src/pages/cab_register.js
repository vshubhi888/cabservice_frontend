import React, { useState } from 'react';

export default function Cab() {
  const [form, setForm] = useState({
    cabNumber: '',
    model: '',
    capacity: '',
    driver: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/cabs/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Cab registered successfully!');
        setForm({ cabNumber: '', model: '', capacity: '', driver: '' });
      } else {
        setMessage(data.message || 'Cab registration failed');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">Register Cab</h2>
        </div>
        <div className="card-body">
          {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Cab Number</label>
              <input
                type="text"
                className="form-control"
                name="cabNumber"
                value={form.cabNumber}
                onChange={handleChange}
                required
                placeholder="e.g. MH12AB1234"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                value={form.model}
                onChange={handleChange}
                required
                placeholder="e.g. Toyota Innova"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Capacity</label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g. 4"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Driver Name</label>
              <input
                type="text"
                className="form-control"
                name="driver"
                value={form.driver}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Register Cab</button>
          </form>
        </div>
      </div>
    </div>
  );
}