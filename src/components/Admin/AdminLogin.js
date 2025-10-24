import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple password check - you can change this
    if (password === 'lankadeals2024') {
      onLogin(true);
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-lock"></i>
          <h2>Admin Access</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i>
            Enter Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;