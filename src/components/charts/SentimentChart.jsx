import React, { useEffect, useRef, useCallback, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { useDarkMode } from '../../hooks/useDarkMode';
import { fetchOverallSentiment } from '../../redux/actions.js';


const SentimentChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { darkMode } = useDarkMode();
  /*
  const dispatch = useDispatch()

  const sentimentData = useSelector(state =>state.sentiment);

console.log("sentimentData:", sentimentData);
  
  const filters = useSelector(state =>state.filters)
  console.log(filters);
  const isLoading = useSelector(state => state.loading.overallSentiment);
  const error = useSelector(state => state.errors.overallSentiment);

  useEffect(()=>{
    console.log("Sentiment Chart: useEffect trigger: Fetching overall sentiment with filter", filters);
    dispatch(fetchOverallSentiment());
    
    
  },[dispatch, filters])
  console.log("SentimentData: ", sentimentData);*/
  

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Dữ liệu mẫu
    const data = {
      labels: ["Positive","Neutral", "Negative"],
      datasets: [
        {
          label: 'Tích cực',
          data: [10],
          backgroundColor: '#2ec4b6',
        },
        {
          label: 'Trung lập',
          data: 70,
          backgroundColor: '#adb5bd',
        },
        {
          label: 'Tiêu cực',
          data: 20,
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