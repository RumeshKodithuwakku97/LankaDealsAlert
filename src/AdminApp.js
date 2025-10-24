import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import AddDealForm from './components/Admin/AddDealForm';
import { googleSheetsAPI } from './services/googleSheets';

function AdminApp() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDeals: 0,
    activeDeals: 0,
    categories: {}
  });

  const loadDeals = useCallback(async () => {
    try {
      setLoading(true);
      const dealsData = await googleSheetsAPI.getDeals();
      setDeals(dealsData);
      calculateStats(dealsData);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const calculateStats = (dealsData) => {
    const categories = {};
    dealsData.forEach(deal => {
      categories[deal.category] = (categories[deal.category] || 0) + 1;
    });

    setStats({
      totalDeals: dealsData.length,
      activeDeals: dealsData.filter(deal => deal.isactive).length,
      categories
    });
  };

  const handleDealAdded = () => {
    loadDeals(); // Reload deals after adding new one
  };

  const handleLogout = () => {
    // Redirect back to main site
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="AdminApp">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div className="admin-logo">
              <i className="fas fa-tools"></i>
              <span>LankaDealsAlerts Admin</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Back to Site
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Admin Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalDeals}</div>
            <div className="stat-label">Total Deals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.activeDeals}</div>
            <div className="stat-label">Active Deals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Object.keys(stats.categories).length}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>

        {/* Add Deal Form */}
        <AddDealForm onDealAdded={handleDealAdded} />

        {/* Recent Deals Preview */}
        <div className="recent-deals">
          <h3>Recent Deals ({deals.length})</h3>
          <div className="deals-list">
            {deals.slice(0, 5).map(deal => (
              <div key={deal.id} className="deal-preview">
                <img src={deal.imageurl} alt={deal.title} className="preview-image" />
                <div className="preview-info">
                  <h4>{deal.title}</h4>
                  <p>{deal.store} • {deal.category}</p>
                  <span className="preview-price">{deal.currentprice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;