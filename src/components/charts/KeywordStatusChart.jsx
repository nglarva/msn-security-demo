import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDarkMode } from '../../hooks/useDarkMode';

const KeywordStatusChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { darkMode } = useDarkMode();
  
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Dữ liệu mẫu
    const data = {
      labels: ['Đang theo dõi', 'Cảnh báo', 'Đã chặn'],
      datasets: [
        {
          data: [4200, 830, 201],
          backgroundColor: [
            '#2ec4b6',
            '#ff9f1c',
            '#e63946'
          ],
          borderWidth: 0
        }
      ]
    };
    
    // Cấu hình
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
    
    // Tạo biểu đồ
    chartInstance.current = new Chart(ctx, config);
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [darkMode]);
  
  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#2ec4b6' }}></div>
          <span>Đang theo dõi</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff9f1c' }}></div>
          <span>Cảnh báo</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#e63946' }}></div>
          <span>Đã chặn</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordStatusChart;