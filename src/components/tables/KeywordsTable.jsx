import React from 'react';
import { useState, useRef,useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchNegativePosts } from '../../redux/actions.js';
import { useDarkMode } from '../../hooks/useDarkMode';

const KeywordsTable = () => {
  const { darkMode} = useDarkMode();

  const negativePostsData = useSelector(state => state.posts.negativePosts);
  console.log("Negative Posts: ", negativePostsData)
  const isLoading = useSelector(state => state.loading.negativePosts);
  const error = useSelector(state => state.errors.negativePosts);
  const filters = useSelector(state => state.filters);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  console.log("Filters negative keyword", filters)
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("Negative posts table: useEffect triggered - Fetching negative posts with filters: ", filters);
    console.log("Page, limit: ", page,limit);
    dispatch(fetchNegativePosts(page, limit));
  },[dispatch, filters, page, limit]);

  const totalPages = negativePostsData.totalPages;

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); // reset to page 1 when limit changes
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };
  // Dữ liệu mẫu
  const posts_detail = negativePostsData.data;
    
  

  // Hàm render trạng thái
  const renderStatus = (status) => {
    const statusClasses = {
      active: 'status-active',
      pending: 'status-pending',
      blocked: 'status-blocked'
    };
    
    const statusLabels = {
      active: 'Đang theo dõi',
      pending: 'Cảnh báo',
      blocked: 'Đã chặn'
    };
    
    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };
  
  return (
    <div className="table-container">
      <div className="table-controls">
        <div className='limit-control'>
          <label>
          Show:&nbsp;
          <select value={limit} onChange={handleLimitChange}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
        <span>Page {page} / {totalPages || 1}</span>
        </div>
        <div className='page-control'>
          <button onClick={handlePrevPage} disabled={page <= 1}>← Previous</button>
          <button onClick={handleNextPage} disabled={page >= totalPages}>Next →</button>
        </div>
        
      </div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Link</th>
            <th>Keyword</th>
            <th>Severity</th>
            <th>Platform</th>            
            <th>Negative words</th>
            <th>Negative point</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts_detail.map((item) => (
            <tr key={item.id}>
              <td>{item.timestamp}</td>
              <td><a href="{item.link_post}">Link</a></td>
              <td>{item.keyword}</td>
              <td>{item.severity}</td>
              <td>{item.platform}</td>
              <td>{item.negativeWordsFound}</td>
              <td>{item.negative_point}</td>              
              <td><input type="checkbox" name="executed" id="action-execution" checked="false" /></td>            
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeywordsTable;