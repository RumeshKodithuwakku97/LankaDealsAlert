import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import HeroSection from './components/UI/HeroSection';
import DealsGrid from './components/Deals/DealsGrid';
import Newsletter from './components/UI/Newsletter';
import Footer from './components/Layout/Footer';
import ApiStatus from './components/UI/ApiStatus';
import { googleSheetsAPI } from './services/googleSheets';
import { useAuth } from './context/AuthContext';

function App() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, login, logout, register } = useAuth();

  // Load deals on component mount
  useEffect(() => {
    loadDeals();
  }, []);

  // Filter deals when category or search term changes
  const filterDeals = useCallback(() => {
    let filtered = deals;

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(deal => 
        deal.category && deal.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(deal =>
        (deal.title && deal.title.toLowerCase().includes(searchLower)) ||
        (deal.store && deal.store.toLowerCase().includes(searchLower)) ||
        (deal.category && deal.category.toLowerCase().includes(searchLower))
      );
    }

    setFilteredDeals(filtered);
  }, [deals, activeCategory, searchTerm]);

  useEffect(() => {
    filterDeals();
  }, [filterDeals]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const dealsData = await googleSheetsAPI.getDeals();
      setDeals(dealsData);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setActiveCategory('all');
  };

  const handleNewsletterSubscribe = async (email) => {
    const result = await googleSheetsAPI.subscribeNewsletter(email);
    if (result.success) {
      alert('Thank you for subscribing! You will receive daily deal alerts.');
    } else {
      alert('Subscription failed. Please try again.');
    }
  };

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    return result;
  };

  const handleSignup = async (email, password, displayName) => {
    const result = await register(email, password, displayName);
    return result;
  };

  const handleLogout = async () => {
    await logout();
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing deals from Sri Lankan stores...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header with authentication */}
      <Header 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
        user={user}
      />

      {/* Navigation with category filters */}
      <Navigation 
        onCategoryChange={handleCategoryChange} 
        activeCategory={activeCategory}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container">
        {/* API Connection Status */}
        <ApiStatus />

        {/* User Welcome Message */}
        {user && (
          <div className="user-welcome">
            <i className="fas fa-user-check"></i>
            Welcome back, {user.displayName || user.email}!
          </div>
        )}

        {/* Search and Category Info */}
        <div className="content-header">
          <div className="category-info">
            <h2>
              {searchTerm ? (
                <>Search Results for "{searchTerm}"</>
              ) : (
                <>
                  {activeCategory === 'all' ? 'All Hot Deals' : 
                  `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Deals`}
                </>
              )}
              <span className="deals-count"> ({filteredDeals.length} deals)</span>
            </h2>
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => handleSearch('')}
              >
                <i className="fas fa-times"></i>
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Deals Grid */}
        <DealsGrid deals={filteredDeals} />

        {/* Newsletter */}
        <Newsletter onSubscribe={handleNewsletterSubscribe} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Hidden Admin Access - Only for authenticated users */}
      {user && (
        <div className="hidden-admin-access">
          <a href="/admin" className="admin-link">
            <i className="fas fa-cog"></i>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;