import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import AdminApp from './AdminApp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);