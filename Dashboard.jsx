// src/Dashboard.js

import React from 'react';
import './Dashboard.css';

function Dashboard({ onGoToStockManagement, onLogout }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Wings Cafe</h2>
      <button onClick={onGoToStockManagement}>Go to Stock Management</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
