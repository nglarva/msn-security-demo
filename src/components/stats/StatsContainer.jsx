import { useState, useEffect, useCallback } from 'react';
import { getKeywords, getPosts } from '../../services/api';
import StatCard from './StatCard';

// Constants
const REFRESH_INTERVAL = 30000; // 30 seconds
const INITIAL_STATS = [
  {
    icon: 'fa-search',
    value: '0',
    label: 'Từ khóa theo dõi',
    trend: { value: '0%', up: true }
  },
  {
    icon: 'fa-exclamation-triangle',
    value: '0',
    label: 'Tiến độ phân tích',
    trend: { value: '0%', up: true }
  },
  {
    icon: 'fa-shield-alt',
    value: '0%',
    label: 'Cảnh báo mới',
    trend: { value: '0%', up: true }
  },
  {
    icon: 'fa-ban',
    value: '0',
    label: 'Tiêu cực/Chưa xử lý',
    trend: { value: '0%', up: false }
  }
];

const StatsContainer = () => {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const countUniqueKeywords = useCallback((posts) => {
    if (!Array.isArray(posts)) return 0;
    
    const uniqueKeywordIds = new Set();
    posts.forEach(post => {
      if (post.keyword_id) {
        uniqueKeywordIds.add(post.keyword_id);
      }
    });
    return uniqueKeywordIds.size;
  }, []);

  const fetchKeywords = useCallback(async () => {
    try {
      const data = await getKeywords();
      console.log("Keywords received:", data);
      return data;
    } catch (error) {
      console.error('Error fetching keywords:', error);
      setError('Không thể tải keywords');
      throw error;
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postsData, keywordsData] = await Promise.all([
        getPosts(),
        fetchKeywords()
      ]);

      console.log('API data received:', postsData);
      
      const updatedStats = [...INITIAL_STATS];
      
      // Update keyword count
      if (postsData?.posts?.data) {
        const uniqueKeywordsCount = countUniqueKeywords(postsData.posts.data);
        updatedStats[0].value = uniqueKeywordsCount.toLocaleString();
        console.log("Số từ khóa khác nhau:", uniqueKeywordsCount);
      }
      if(keywordsData?.data?.length){
        let numberOfPendingKeywords = [].concat(...keywordsData.data).filter(item => item.status === "scanning").length + [].concat(...keywordsData.data).filter(item => item.status === "scanned").length;
        console.log("Number of pending keywords", numberOfPendingKeywords);
        updatedStats[1].value = numberOfPendingKeywords.toLocaleString();
      }

      // Here you can update other stats based on keywordsData
      // For example:
      // updatedStats[3].value = keywordsData.blockedCount || '0';
      
      setStats(updatedStats);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Không thể tải dữ liệu thống kê');
    } finally {
      setLoading(false);
    }
  }, [countUniqueKeywords, fetchKeywords]);

  useEffect(() => {
    fetchStats();
    
    const intervalId = setInterval(fetchStats, REFRESH_INTERVAL);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchStats]);

  if (loading) return <div className="stats-container loading">Đang tải...</div>;
  if (error) return <div className="stats-container error">{error}</div>;

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <StatCard
          key={`stat-${index}`}
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