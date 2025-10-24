import React, { useState, useEffect } from 'react';
import { firestoreService } from '../../services/firestoreService';

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0
  });

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const result = await firestoreService.getAllSubscribers();
      
      if (result.success) {
        setSubscribers(result.subscribers);
        calculateStats(result.subscribers);
      }
    } catch (error) {
      console.error('Error loading subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (subs) => {
    const active = subs.filter(s => s.status === 'active').length;
    const unsubscribed = subs.filter(s => s.status === 'unsubscribed').length;
    
    setStats({
      total: subs.length,
      active: active,
      unsubscribed: unsubscribed
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading newsletter subscribers...</p>
      </div>
    );
  }

  return (
    <div className="newsletter-manager">
      <div className="manager-header">
        <h3>
          <i className="fas fa-users"></i>
          Newsletter Subscribers
        </h3>
        <button onClick={loadSubscribers} className="refresh-btn">
          <i className="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="newsletter-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.unsubscribed}</div>
          <div className="stat-label">Unsubscribed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
          </div>
          <div className="stat-label">Retention Rate</div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="subscribers-table-container">
        <table className="subscribers-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Subscribed Date</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className={subscriber.status}>
                <td className="subscriber-email">{subscriber.email}</td>
                <td className="subscriber-status">
                  <span className={`status-badge ${subscriber.status}`}>
                    {subscriber.status}
                  </span>
                </td>
                <td className="subscriber-date">
                  {formatDate(subscriber.subscribedAt)}
                </td>
                <td className="subscriber-source">
                  {subscriber.source || 'website'}
                </td>
                <td className="subscriber-actions">
                  <button 
                    className="action-btn view-btn"
                    title="View Details"
                    onClick={() => console.log('View subscriber:', subscriber)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    className="action-btn export-btn"
                    title="Export Email"
                    onClick={() => navigator.clipboard.writeText(subscriber.email)}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscribers.length === 0 && (
          <div className="no-subscribers">
            <i className="fas fa-inbox"></i>
            <p>No newsletter subscribers yet</p>
            <span>Subscribers will appear here when they sign up</span>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="export-options">
        <h4>Export Subscribers</h4>
        <div className="export-buttons">
          <button className="export-btn">
            <i className="fas fa-file-csv"></i>
            Export as CSV
          </button>
          <button className="export-btn">
            <i className="fas fa-file-excel"></i>
            Export as Excel
          </button>
          <button 
            className="export-btn"
            onClick={() => {
              const emails = subscribers
                .filter(s => s.status === 'active')
                .map(s => s.email)
                .join(', ');
              navigator.clipboard.writeText(emails);
              alert('Active subscriber emails copied to clipboard!');
            }}
          >
            <i className="fas fa-copy"></i>
            Copy Active Emails
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterManager;