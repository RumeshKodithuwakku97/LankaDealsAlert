import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import AddDealForm from './components/Admin/AddDealForm';
import NewsletterManager from './components/Admin/NewsletterManager';
import { googleSheetsAPI } from './services/googleSheets';
import { useAuth } from './context/AuthContext';

function AdminApp() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalDeals: 0,
    activeDeals: 0,
    categories: {}
  });

  const { user, logout } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      window.location.href = '/';
      return;
    }
  }, [user]);

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
    if (user) {
      loadDeals();
    }
  }, [user, loadDeals]);

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
    loadDeals();
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  // Show loading while checking auth
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

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
            <div className="admin-actions">
              <div className="user-info">
                <i className="fas fa-user-shield"></i>
                <span className="admin-welcome">
                  {user.displayName || user.email}
                </span>
                <span className="user-role">Administrator</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Admin Tabs */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-chart-bar"></i>
            Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'deals' ? 'active' : ''}`}
            onClick={() => setActiveTab('deals')}
          >
            <i className="fas fa-tags"></i>
            Manage Deals
          </button>
          <button 
            className={`tab-btn ${activeTab === 'newsletter' ? 'active' : ''}`}
            onClick={() => setActiveTab('newsletter')}
          >
            <i className="fas fa-users"></i>
            Newsletter
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Admin Dashboard */}
            <div className="admin-dashboard">
              <h1>Admin Dashboard</h1>
              <p>Manage deals and monitor your website performance</p>
            </div>

            {/* Admin Stats */}
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-tags"></i>
                </div>
                <div className="stat-number">{stats.totalDeals}</div>
                <div className="stat-label">Total Deals</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="stat-number">{stats.activeDeals}</div>
                <div className="stat-label">Active Deals</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-folder"></i>
                </div>
                <div className="stat-number">{Object.keys(stats.categories).length}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-number">
                  {stats.totalDeals > 0 ? Math.round((stats.activeDeals / stats.totalDeals) * 100) : 0}%
                </div>
                <div className="stat-label">Active Rate</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="category-stats">
              <h3>Deals by Category</h3>
              <div className="category-list">
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="category-stat">
                    <span className="category-name">
                      <i className={`fas ${
                        category === 'electronics' ? 'fa-laptop' :
                        category === 'fashion' ? 'fa-tshirt' :
                        category === 'home' ? 'fa-home' :
                        category === 'grocery' ? 'fa-shopping-basket' :
                        category === 'beauty' ? 'fa-spa' :
                        'fa-desktop'
                      }`}></i>
                      {category}
                    </span>
                    <span className="category-count">{count} deals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={() => setActiveTab('deals')}
                >
                  <i className="fas fa-plus"></i>
                  Add New Deal
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setActiveTab('newsletter')}
                >
                  <i className="fas fa-envelope"></i>
                  View Subscribers
                </button>
                <button className="action-btn secondary">
                  <i className="fas fa-sync"></i>
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Recent Deals */}
            <div className="admin-section">
              <h3>Recent Deals</h3>
              <div className="recent-deals-grid">
                {deals.slice(0, 6).map(deal => (
                  <div key={deal.id} className="recent-deal-card">
                    <img src={deal.imageurl} alt={deal.title} />
                    <div className="deal-info">
                      <h4>{deal.title}</h4>
                      <p className="deal-store">{deal.store}</p>
                      <div className="deal-meta">
                        <span className="deal-price">{deal.currentprice}</span>
                        <span className="deal-category">{deal.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {deals.length > 6 && (
                <p className="view-more-text">
                  ... and {deals.length - 6} more deals in your database
                </p>
              )}
            </div>
          </>
        )}

        {/* Deals Management Tab */}
        {activeTab === 'deals' && (
          <div className="admin-section">
            <div className="section-header">
              <h3>Manage Deals</h3>
              <p>Add new deals or manage existing ones</p>
            </div>
            <AddDealForm onDealAdded={handleDealAdded} />
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="admin-section">
            <div className="section-header">
              <h3>Newsletter Management</h3>
              <p>Manage your newsletter subscribers and campaigns</p>
            </div>
            <NewsletterManager />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApp;