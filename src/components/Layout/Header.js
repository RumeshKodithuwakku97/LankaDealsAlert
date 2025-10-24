import React, { useState } from 'react';
import LoginModal from '../Auth/LoginModal';
import SignupModal from '../Auth/SignupModal';

const Header = ({ 
  currentLanguage, 
  setCurrentLanguage, 
  onSearch, 
  searchTerm, 
  onLogin, 
  onSignup, 
  onLogout, 
  user 
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(localSearchTerm);
    }
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleLoginSubmit = async (email, password) => {
    const result = await onLogin(email, password);
    if (result.success) {
      setShowLoginModal(false);
    }
    return result;
  };

  const handleSignupSubmit = async (email, password, displayName) => {
    const result = await onSignup(email, password, displayName);
    if (result.success) {
      setShowSignupModal(false);
    }
    return result;
  };

  return (
    <header className="header">
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLoginSubmit}
        />
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)}
          onSubmit={handleSignupSubmit}
        />
      )}

      <div className="language-selector">
        <button 
          className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('en')}
        >EN</button>
        <button 
          className={`lang-btn ${currentLanguage === 'si' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('si')}
        >සිං</button>
        <button 
          className={`lang-btn ${currentLanguage === 'ta' ? 'active' : ''}`}
          onClick={() => setCurrentLanguage('ta')}
        >தமிழ்</button>
      </div>
      
      <div className="container">
        <div className="header-top">
          <div className="logo">
            <i className="fas fa-tags"></i>
            Lanka<span>Deals</span>Alerts
          </div>
          <div className="search-bar">
            <i className="fas fa-search" onClick={handleSearch}></i>
            <input 
              type="text" 
              placeholder={
                currentLanguage === 'en' ? "Search for deals, products, or stores..." :
                currentLanguage === 'si' ? "ගනුදෙනු, නිෂ්පාදන, හෝ වෙළඳසැල් සොයන්න..." :
                "ஒப்பந்தங்கள், பொருட்கள் அல்லது கடைகளைத் தேடுங்கள்..."
              }
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
            {localSearchTerm && (
              <i className="fas fa-times clear-search" onClick={clearSearch}></i>
            )}
          </div>
          <div className="auth-buttons">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">
                  <i className="fas fa-user"></i>
                  Hi, {user.displayName || user.email.split('@')[0]}
                </span>
                <button onClick={onLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={handleLoginClick}>
                  <i className="fas fa-user"></i>
                  {currentLanguage === 'en' ? 'Login' : 
                   currentLanguage === 'si' ? 'පිවිසෙන්න' : 'உள்நுழைக'}
                </button>
                <button onClick={handleSignupClick}>
                  <i className="fas fa-user-plus"></i>
                  {currentLanguage === 'en' ? 'Sign Up' : 
                   currentLanguage === 'si' ? 'ලියාපදිංචි වන්න' : 'பதிவு செய்யவும்'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;