// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Analytics from '../components/Analytics';
import { getAnalytics } from '../services/api';
import { showToast } from '../utils/helpers';

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getAnalytics();
      setAnalyticsData(response.data);
    } catch (error) {
      showToast('Failed to load analytics', 'error');
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of user statistics and location-based insights</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading analytics...</p>
        </div>
      ) : (
        <Analytics data={analyticsData} />
      )}
    </div>
  );
};

export default Dashboard;