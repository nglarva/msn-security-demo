import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-shield-alt"></i>
          <span>MSN Security</span>
        </div>
      </div>
      
      <div className="sidebar-menu">
        <a href="#" className="menu-item active">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-search"></i>
          <span>Tìm kiếm</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-bell"></i>
          <span>Cảnh báo</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-chart-line"></i>
          <span>Báo cáo</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-cog"></i>
          <span>Cài đặt</span>
        </a>
      </div>
      
      <div className="sidebar-footer">
        <span>© 2025 MSN Security v1.2.0</span>
      </div>
    </div>
  );
};

export default Sidebar;