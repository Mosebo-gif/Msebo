// src/Registration.js

import React, { useState } from 'react';
import './Registration.css';

function Registration({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
