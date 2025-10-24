import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Determine which app to show based on route
const root = ReactDOM.createRoot(document.getElementById('root'));

// Simple route detection
const path = window.location.pathname;

if (path === '/admin') {
  // Lazy load admin app
  import('./AdminApp').then(({ default: AdminApp }) => {
    root.render(
      <React.StrictMode>
        <AdminApp />
      </React.StrictMode>
    );
  });
} else {
  // Main public app
  import('./App').then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}