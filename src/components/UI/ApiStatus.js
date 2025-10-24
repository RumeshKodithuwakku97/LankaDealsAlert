import React, { useState, useEffect } from 'react';
import { googleSheetsAPI } from '../../services/googleSheets';

const ApiStatus = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [dealsCount, setDealsCount] = useState(0);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setApiStatus('checking');
      const deals = await googleSheetsAPI.getDeals();
      
      if (deals && deals.length > 0) {
        setApiStatus('connected');
        setDealsCount(deals.length);
      } else {
        setApiStatus('no-data');
      }
    } catch (error) {
      setApiStatus('error');
    }
  };

  const getStatusMessage = () => {
    switch (apiStatus) {
      case 'connected':
        return `✅ Connected to Google Sheets • ${dealsCount} deals loaded`;
      case 'checking':
        return '🔄 Connecting to Google Sheets...';
      case 'error':
        return '❌ Connection failed • Using sample data';
      case 'no-data':
        return '⚠️ Connected but no deals found';
      default:
        return 'Checking connection...';
    }
  };

  return (
    <div className={`api-status ${apiStatus}`}>
      <div className="status-content">
        <span className="status-message">{getStatusMessage()}</span>
        <button 
          className="refresh-btn"
          onClick={checkApiStatus}
          title="Refresh connection"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default ApiStatus;