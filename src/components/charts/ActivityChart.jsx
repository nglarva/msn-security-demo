import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDarkMode } from '../../hooks/useDarkMode';

const ActivityChart = () => {
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
          label: 'Đã xử lý',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Đang xử lý',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: '#ff9f1c',
          backgroundColor: 'rgba(230, 57, 70, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Chưa xử lý',
          data: [12, 19, 3, 5, 2, 4, 7],
          borderColor: '#e63946',
          backgroundColor: 'rgba(230, 57, 70, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
    
    // Cấu hình
    const config = {
      type: 'line',
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
            grid: {
              display: false,
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: darkMode ? '#adb5bd' : '#6c757d'
            }
          },
          y: {
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
          <div className="legend-color" style={{ backgroundColor: '#4361ee' }}></div>
          <span>Đã xử lý</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff9f1c' }}></div>
          <span>Đang xử lý</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#e63946' }}></div>
          <span>Chưa xử lý</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;