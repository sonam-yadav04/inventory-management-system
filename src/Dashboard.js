// src/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/Login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>My Dashboard</h2>
        <ul className="nav-menu">
        <li><Link to="/ProductForm">Products</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/Settings">Settings</Link></li>
          <li><Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h3>Welcome to your dashboard!</h3>
      </div>
    </div>
  );
}

export default Dashboard;
