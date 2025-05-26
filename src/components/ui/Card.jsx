import React from 'react';
import '../../styles/components/cards.css'
const Card = ({ title, children, actions }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
        {actions && (
          <div className="card-actions">
            {actions.map((action, index) => (
              <div key={index} className="card-action">
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;