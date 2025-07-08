import React from "react";
import "../../styles/components/cards.css";
import Button from "./Button";
const Card = ({ title, children, actions = [] }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
        {actions.length > 0 && (
          <div className="card-actions">
            {actions.map((action, index) => {
              if (typeof action === "string") {
                return (
                  <Button key={index} variant="primary">
                    {action}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={index}
                    variant="primary"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                );
              }
            })}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
