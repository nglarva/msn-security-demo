import React from 'react';
const StatCard = ({ icon, value, label, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div className={`stat-trend ${trend.up ? 'up' : 'down'}`}>
          <i className={`fas fa-arrow-${trend.up ? 'up' : 'down'}`}></i>
          {trend.value}
        </div>
      )}
    </div>
  );
};

export default StatCard;