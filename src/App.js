import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "../src/pages/Signup";
import Login from "../src/pages/Login";
import './App.css';
import Welcome from './pages/Welcome';
import ProtectedRoute from './security/ProtectedRoute';
import Logout from './pages/Logout';
import Nav from './components/Nav';
import Home from './pages/Home';
function App() {
  return (
    <Router>

        <Nav />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<ProtectedRoute><Welcome/></ProtectedRoute>} />
          <Route path="/" element={<Home/>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

    </Router>
  );
}

export default App;