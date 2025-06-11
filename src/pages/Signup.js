import React, { useState } from 'react';

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'driver',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    setMessage('');
    try {

      // calling backend api for registration
      // using fetch to send a POST request to the server
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Registration successful!');
        setForm({ name: '', email: '', phone: '', role: 'driver', password: '' });
      } else {
        setMessage(data.message || 'Registration failed');
      }
    }catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 500}}>
      <h2>Sign Up</h2>

     
      {message && <div className="alert alert-info">{message}</div>}


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" name="role" value={form.role} onChange={handleChange} required>
            <option value="driver">Driver</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}