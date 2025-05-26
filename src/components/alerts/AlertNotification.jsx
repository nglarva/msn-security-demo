import React from 'react';

const AlertNotification = ({ title, description, actions }) => {
  return (
    <div className="alert-notification">
      <div className="alert-icon">
        <i className="fas fa-exclamation"></i>
      </div>
      <div className="alert-content">
        <div className="alert-text">
          <div className="alert-title">{title}</div>
          <div className="alert-description">{description}</div>
        </div>
        {actions && (
          <div className="alert-actions">
            {actions.map((action, index) => (
              <button 
                key={index} 
                className={`btn ${action.primary ? 'btn-primary' : 'btn-outline'}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertNotification;