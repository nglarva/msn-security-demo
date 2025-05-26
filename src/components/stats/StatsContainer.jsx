import React from 'react';
import StatCard from './StatCard';

const StatsContainer = () => {
  const stats = [
    {
      icon: 'fa-search',
      value: '5,231',
      label: 'Từ khóa theo dõi',
      trend: { value: '+12%', up: true }
    },
    {
      icon: 'fa-exclamation-triangle',
      value: '127',
      label: 'Cảnh báo mới',
      trend: { value: '+5%', up: true }
    },
    {
      icon: 'fa-shield-alt',
      value: '98.2%',
      label: 'Độ bảo mật',
      trend: { value: '+0.5%', up: true }
    },
    {
      icon: 'fa-ban',
      value: '42',
      label: 'Từ khóa chặn',
      trend: { value: '-8%', up: false }
    }
  ];
  
  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default StatsContainer;