// frontend/src/components/Analytics.jsx
import React from 'react';

const Analytics = ({ data }) => {
  if (!data) {
    return <div className="loading">Loading analytics...</div>;
  }

  const { totalUsers, byCountry, byState, byCity } = data;

  return (
    <div className="analytics-container">
      <div className="stats-card total-users">
        <h3>Total Users</h3>
        <div className="stat-value">{totalUsers}</div>
      </div>

      <div className="analytics-section">
        <h3>Users by Country</h3>
        <div className="chart-container">
          {byCountry && byCountry.length > 0 ? (
            <div className="bar-chart">
              {byCountry.map((item, index) => {
                const percentage = (item.count / totalUsers) * 100;
                return (
                  <div key={index} className="bar-item">
                    <div className="bar-label">
                      <span className="label-text">{item.country}</span>
                      <span className="label-count">{item.count}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Top 10 States</h3>
        <div className="chart-container">
          {byState && byState.length > 0 ? (
            <div className="bar-chart">
              {byState.map((item, index) => {
                const percentage = (item.count / totalUsers) * 100;
                return (
                  <div key={index} className="bar-item">
                    <div className="bar-label">
                      <span className="label-text">
                        {item.state}, {item.country}
                      </span>
                      <span className="label-count">{item.count}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Top 10 Cities</h3>
        <div className="chart-container">
          {byCity && byCity.length > 0 ? (
            <div className="bar-chart">
              {byCity.map((item, index) => {
                const percentage = (item.count / totalUsers) * 100;
                return (
                  <div key={index} className="bar-item">
                    <div className="bar-label">
                      <span className="label-text">
                        {item.city}, {item.state}
                      </span>
                      <span className="label-count">{item.count}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;