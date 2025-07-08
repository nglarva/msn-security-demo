import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter, getToDay, getDaysAgo, getMonthsAgo, getWeeksAgo, getFirstDateOfWeekFromYearWeek} from '../../redux/actions.js';
import Sidebar from './Sidebar';
import Header from './Header';
import AlertNotification from '../alerts/AlertNotification';
import StatsContainer from '../stats/StatsContainer';
import ActivityChart from '../charts/ActivityChart';
import KeywordStatusChart from '../charts/KeywordStatusChart';
import SentimentChart from '../charts/SentimentChart';
import KeywordsTable from '../tables/KeywordsTable';
import Card from '../ui/Card';
import Button from '../ui/Button'
import { useDarkMode } from '../../hooks/useDarkMode';



const Dashboard = () => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();
  const handlePeriodChange = (period) => {
      let startDate, endDate;
      endDate = getToDay();
      switch (period){
        case 'daily':
          startDate = getDaysAgo(7);
          console.log("daily clicked");
          break;
        case 'weekly':
          startDate = getWeeksAgo(4);
          console.log("weekly clicked");
          break;
        case 'monthly':
          startDate = getMonthsAgo(6);
          console.log("monthly clicked");
          break;
        default:
          startDate = getDaysAgo(7);
          console.log("default")
      }
      dispatch(updateFilter('period', period));
      dispatch(updateFilter('startDate', startDate));
      dispatch(updateFilter('endDate', endDate));
    };
  
    const chartPeriodActions = [
      {label: 'Daily', onClick: () => handlePeriodChange('daily')},
      {label: 'Weekly', onClick: () => handlePeriodChange('weekly')},
      {label: 'Monthly', onClick: () => handlePeriodChange('monthly')},
    ]
  
  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <div className="main-content">
        <Header title="Dashboard" />
        
        {/* Notifications Row */}
        <div className="notifications-row">
          <AlertNotification 
            title="Phát hiện từ khóa nhạy cảm"
            description="Hệ thống đã phát hiện 3 từ khóa nhạy cảm mới trong 24 giờ qua."
            actions={[{ label: 'Xem chi tiết', primary: true },{ label: 'Bỏ qua', primary: false }
]}
          />
          <StatsContainer />
        </div>
        
        {/* Charts Row */}
        <div className="charts-row">
          <Card title="Ghi nhận theo thời gian" actions={chartPeriodActions}>
            <ActivityChart />
          </Card>
          
          <Card title="Status all posts">
            <KeywordStatusChart />
          </Card>
        </div>
        
        {/* Bottom Row */}
        <div className="bottom-row">
          {/* <Card title="Phân tích cảm xúc người dùng" actions={['Xuất báo cáo']}>
            <SentimentChart />
          </Card> */}
          
          <Card title="Từ khóa tiêu cực gần đây">
            <KeywordsTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;