// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

function Dashboard() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState({ name: '', username: '' });

  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [showStockMenu, setShowStockMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/Login');
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>Inventory Management System</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <h3>Welcome, {user.name}!</h3>
        <p>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</p>
      </div>
      <div className="menu-grid">
        {/* Products */}
        <div className="menu-item">
          <button className="menu-btn" onClick={() => setShowProductMenu(!showProductMenu)}>
           <h2>📦 Products</h2> 
          </button>
          {showProductMenu && (
            <div className="submenu">
              <Link to="/productForm">➕ Add Product</Link>
              <Link to="/productList">📋 View Products</Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <div className="menu-item">
          <button className="menu-btn" onClick={() => setShowOrderMenu(!showOrderMenu)}>
           <h2> 🧾 Orders</h2>
          </button>
          {showOrderMenu && (
            <div className="submenu">
              <Link to="/orderForm">➕ Create Order</Link>
              <Link to="/OrderList">📄 View Orders</Link>
            </div>
          )}
        </div>

        {/* Stocks */}
        <div className="menu-item">
          <button className="menu-btn" onClick={() => setShowStockMenu(!showStockMenu)}>
           <h2> 📥 Stocks</h2>
          </button>
          {showStockMenu && (
            <div className="submenu">
              <Link to="/StockForm">➕ Add Stock</Link>
              <Link to="/StockList">📦 View Stocks</Link>
            </div>
          )}
        </div>

        {/* Employee */}
        <div className="menu-item">
          <Link to="/Employee"><h2>👨‍💼 Employee Details</h2></Link>
        </div>

        {/* Settings */}
        <div className="menu-item">
          <Link to="/Settings"><h2>⚙️ Settings</h2></Link>
        </div>
      </div>

      
    </div>
  );
}

export default Dashboard;
