import React, { useState } from 'react';

const Header = ({ currentLanguage, setCurrentLanguage, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <header className="header">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
            {searchTerm && (
              <i className="fas fa-times clear-search" onClick={clearSearch}></i>
            )}
          </div>
          <div className="auth-buttons">
            <button>
              <i className="fas fa-user"></i>
              {currentLanguage === 'en' ? 'Login' : 
               currentLanguage === 'si' ? 'පිවිසෙන්න' : 'உள்நுழைக'}
            </button>
            <button>
              <i className="fas fa-user-plus"></i>
              {currentLanguage === 'en' ? 'Sign Up' : 
               currentLanguage === 'si' ? 'ලියාපදිංචි වන්න' : 'பதிவு செய்யவும்'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;