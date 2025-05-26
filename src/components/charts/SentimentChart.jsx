import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDarkMode } from '../../hooks/useDarkMode';

const SentimentChart = () => {
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
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [
        {
          label: 'Tích cực',
          data: [65, 59, 80, 81, 56, 55, 60],
          backgroundColor: '#2ec4b6',
        },
        {
          label: 'Trung lập',
          data: [28, 48, 40, 19, 36, 27, 30],
          backgroundColor: '#adb5bd',
        },
        {
          label: 'Tiêu cực',
          data: [18, 28, 20, 29, 16, 17, 10],
          backgroundColor: '#e63946',
        }
      ]
    };
    
    // Cấu hình
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: darkMode ? '#adb5bd' : '#6c757d'
            }
          },
          y: {
            stacked: true,
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: darkMode ? '#adb5bd' : '#6c757d'
            }
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
          <span>Tích cực</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#adb5bd' }}></div>
          <span>Trung lập</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#e63946' }}></div>
          <span>Tiêu cực</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;