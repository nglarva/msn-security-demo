import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOverallSentiment } from '../../redux/actions.js';
import { use } from 'react';

const KeywordStatusChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const overallStatusData = useSelector(state => state.sentiment);
  const filters = useSelector(state => state.filters)
  const isLoading = useSelector(state => state.loading.overallSentiment);
    const error = useSelector(state => state.errors.overallSentiment);
  
  useEffect(()=>{
      console.log("Sentiment Chart: useEffect trigger: Fetching overall sentiment with filter", filters);
      dispatch(fetchOverallSentiment());
      
      
    },[dispatch,filters])
    console.log("SentimentData: ", overallStatusData);
  const positivePer = Math.round(Number(overallStatusData.sentimentDistribution.positivePercentage));
  const positiveCount = overallStatusData.sentimentDistribution.positiveCount;
  console.log("Positive: ", positivePer);
  const negativePer = Math.round(Number(overallStatusData.sentimentDistribution.negativePercentage));
  const negativeCount = overallStatusData.sentimentDistribution.negativeCount;
  const neutralPer = Math.round(Number(overallStatusData.sentimentDistribution.neutralPercentage));
  const neutralCount = overallStatusData.sentimentDistribution.neutralCount;


  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Dữ liệu mẫu
    const data = {
      labels: ['An toàn', 'Cảnh báo', 'Nguy hiểm'],
      datasets: [
        {
          data: [positivePer,neutralPer,negativePer],
          backgroundColor: [
            '#2ec4b6',
            '#ff9f1c',
            '#e63946'
          ],
          borderWidth: 0
        }
      ]
    };
    
    //Plugin hiển thị tổng bài viết chỉ ở giữa biểu đồ doughnut
    const totalPlugin = {
      id: 'totalPlugin',
      beforeDraw: (chart) => {
        const { ctx, chartArea: { width, height } } = chart;
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        
        ctx.save();
        ctx.font = 'bold 55px Arial';
        ctx.fillStyle = darkMode ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(total, width / 2, height / 2);
        ctx.restore();
      }
    };

    // Cấu hình
    const config = {
      type: 'doughnut',
      data: data,
      plugins: [totalPlugin],
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
  }, [darkMode, isLoading]);
  
  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#2ec4b6' }}></div>
          <span style={{display:"block"}}>An toàn ({positiveCount})</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff9f1c' }}></div>
          <span style={{display:"block"}}>Cảnh báo ({neutralCount})</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#e63946' }}></div>
          <span style={{display:"block"}}>Nguy hiểm ({negativeCount})</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordStatusChart;