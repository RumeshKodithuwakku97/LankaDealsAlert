import React from 'react';
// REMOVE THIS LINE: import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LankaDealsAlerts</h4>
            <p>Your trusted source for the best deals and discounts across all major Sri Lankan online stores.</p>
          </div>
          <div className="footer-section">
            <h4>Popular Stores</h4>
            <div className="footer-links">
              <a href="#"><i className="fas fa-store"></i> Daraz.lk Deals</a>
              <a href="#"><i className="fas fa-store"></i> Kapruka Offers</a>
              <a href="#"><i className="fas fa-store"></i> MyShop Discounts</a>
              <a href="#"><i className="fas fa-store"></i> Softlogic Sales</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <div className="footer-links">
              <a href="#"><i className="fas fa-laptop"></i> Electronics</a>
              <a href="#"><i className="fas fa-tshirt"></i> Fashion</a>
              <a href="#"><i className="fas fa-home"></i> Home & Living</a>
              <a href="#"><i className="fas fa-shopping-basket"></i> Groceries</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <div className="footer-links">
              <a href="#"><i className="fas fa-info-circle"></i> About Us</a>
              <a href="#"><i className="fas fa-envelope"></i> Contact</a>
              <a href="#"><i className="fas fa-shield-alt"></i> Privacy Policy</a>
              <a href="#"><i className="fas fa-file-contract"></i> Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LankaDealsAlerts.lk - All rights reserved. | Making Sri Lankan shopping affordable!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;