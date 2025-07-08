import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { fetchMentionsTrend, getFirstDateOfWeekFromYearWeek, groupByDateAndPlatform } from "../../redux/actions.js";
//import { getPostsPerDays } from '../../services/api';
// import LoadingIndicator from '../common/LoadingIndicator';
// import ErrorMessage from '../common/ErrorMessage';
import { useDarkMode } from "../../hooks/useDarkMode";

const ActivityChart = ({period}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { darkMode } = useDarkMode();
  

  //Lấy dữ liệu từ Redux store
  const {trendData} = useSelector(state => state.mentions);
  //console.log("Data mentions: ", trendData);
  const isLoading = useSelector(state => state.loading.mentionsTrend);
  const error = useSelector(state => state.errors.mentionsTrend);
  const filters = useSelector(state => state.filters);
  //console.log("Filters: ", filters);
  const currentPeriod = useSelector(state => state.filters.period);
  const dispatch = useDispatch();
  //dispatch(fetchMentionsTrend());
  
// const refreshInterval = setInterval(() =>{
//       console.log("Activity Chart: Loading data in 1 min");
//       dispatch(fetchMentionsTrend());
//     }, 60000);
 

  useEffect(()=> {
    console.log("Activity Chart: useEffect triggered - Fetching mentions trend with filters: ", filters);
    dispatch(fetchMentionsTrend());
    
  }, [dispatch, filters]);

  
  //Sử dụng dữ liệu để phù hợp với Chart
  const labels = trendData.map(item => {
    let date = new Date(item.date);
    switch (filters.period){
      case 'daily':
        console.log(date);
        return `${date.getDate()}/${date.getMonth()+1}`;
      case 'weekly':
        const weeksOfYear = item.date;
        date = getFirstDateOfWeekFromYearWeek(weeksOfYear.split("-")[0],weeksOfYear.split("-")[1])
        console.log(date);
        return `${date.getDate()}/${date.getMonth() + 1}`
      case 'monthly':
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      default:
        return item.date;
    }
  });
  const chartLabels = [...new Set(labels)];
  

  console.log("Data:", trendData);
  const dataScraped = groupByDateAndPlatform(trendData);
  console.log("Data by group: ", dataScraped);
  //const facebookData = trendData.filter(item => item.platform === "Facebook").map(item => item.count);
  const facebookData = dataScraped.map(item => item.Facebook);
  console.log("facebookData: ", facebookData);
  
  const tiktokData = dataScraped.map(item => item.Tiktok);
  console.log("tiktokData: ", tiktokData);
  const threadsData = dataScraped.map(item=>item.Threads);
  console.log("threadsData: ", threadsData);
  const youtubeData = dataScraped.map(item => item.Youtube);
  console.log("youtubeData: ", youtubeData);
    
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (isLoading || error || trendData.length === 0){
      return
    }
    //console.log("PostsData: ", postsData.label);
    const ctx = chartRef.current.getContext("2d");

    // Dữ liệu mẫu
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Facebook",
          data: facebookData,
          borderColor: "#1321ee",
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Tiktok",
          data: tiktokData,
          borderColor: "#ff9f1c",
          backgroundColor: "rgba(230, 57, 70, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Threads",
          data: threadsData,
          borderColor: "#e63946",
          backgroundColor: "rgba(27, 207, 60, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Youtube",
          data: youtubeData,
          borderColor: "#607c00",
          backgroundColor: "rgba(138, 20, 30, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };

    // Cấu hình
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: darkMode ? "#adb5bd" : "#6c757d",
            },
          },
          y: {
            grid: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: darkMode ? "#adb5bd" : "#6c757d",
            },
          },
        },
      },
    };

    // Tạo biểu đồ
    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [darkMode, isLoading, error]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      <div className="chart-legend">
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#4361ee" }}
          ></div>
          <span>Facebook</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#ff9f1c" }}
          ></div>
          <span>Tiktok</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#e40946" }}
          ></div>
          <span>Threads</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#607c00" }}
          ></div>
          <span>Youtube</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
