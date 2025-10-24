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
      const deals = await googleSheetsAPI.getDeals();
      setApiStatus('connected');
      setDealsCount(deals.length);
    } catch (error) {
      setApiStatus('error');
    }
  };

  return (
    <div className={`api-status ${apiStatus}`}>
      <div className="status-indicator">
        <i className={`fas ${
          apiStatus === 'connected' ? 'fa-check-circle' : 
          apiStatus === 'error' ? 'fa-exclamation-triangle' : 'fa-sync fa-spin'
        }`}></i>
        Google Sheets API: {apiStatus.toUpperCase()}
      </div>
      {apiStatus === 'connected' && (
        <div className="deals-count">
          {dealsCount} deals loaded from Google Sheets
        </div>
      )}
      {apiStatus === 'error' && (
        <div className="error-info">
          Using fallback data. Check your API URL and CORS settings.
        </div>
      )}
    </div>
  );
};

export default ApiStatus;