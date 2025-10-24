import React from 'react';

const AdminLogin = () => {
  console.log('AdminLogin component is rendering'); // Check console for this
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#667eea',
      color: 'white',
      fontSize: '24px'
    }}>
      Admin Login Page - If you see this, the component is working!
    </div>
  );
};

export default AdminLogin;