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
          <Card title="Ghi nhận theo thời gian" actions={['Ngày', 'Tuần', 'Tháng']}>
            <ActivityChart />
          </Card>
          
          <Card title="Trạng thái từ khóa">
            <KeywordStatusChart />
          </Card>
        </div>
        
        {/* Bottom Row */}
        <div className="bottom-row">
          <Card title="Phân tích cảm xúc người dùng" actions={['Xuất báo cáo']}>
            <SentimentChart />
          </Card>
          
          <Card title="Từ khóa theo dõi gần đây" actions={['Xem tất cả']}>
            <KeywordsTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;