import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './components/Admin/AdminLogin';

// Simple test component
const TestComponent = () => {
  return (
    <div style={{ padding: '20px', background: 'lightgreen' }}>
      Test Component - Routes are working!
    </div>
  );
};

function AdminApp() {
  console.log('AdminApp is rendering'); // Check console
  
  return (
    <AuthProvider>
      <Router>
        <div className="AdminApp">
          <Routes>
            {/* Test route */}
            <Route path="/test" element={<TestComponent />} />
            
            {/* Admin login route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/admin/login" />} />
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default AdminLogin;