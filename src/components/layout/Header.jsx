import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

const Header = ({ title }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className="header">
      <h1 className="page-title">{title}</h1>
      <div className="header-actions">
        <div className="header-action" onClick={toggleDarkMode}>
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </div>
        <div className="header-action">
          <i className="fas fa-bell"></i>
        </div>
        <div className="header-action">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;