// src/App.js

import React, { useState } from 'react';
import Registration from './registration';
import Login from './login';
import Dashboard from './Dashboard';
import StockManagement from './stock management';
import './App.css';

function App() {
  const [page, setPage] = useState('registration');
  const [user, setUser] = useState(null);

  const handleRegistration = (username, password) => {
    setUser({ username, password });
    setPage('login');
  };

  const handleLogin = (username, password) => {
    if (user && user.username === username && user.password === password) {
      setPage('dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleGoToStockManagement = () => {
    setPage('stockManagement');
  };

  // Logout function to reset user state and navigate to login page
  const handleLogout = () => {
    setUser(null); // Clear user data
    setPage('login'); // Navigate to login page
  };

  return (
    <div className="App">
      {page === 'registration' && <Registration onRegister={handleRegistration} />}
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'dashboard' && <Dashboard onGoToStockManagement={handleGoToStockManagement} onLogout={handleLogout} />}
      {page === 'stockManagement' && <StockManagement onLogout={handleLogout} />}
    </div>
  );
}

export default App;
