import React from 'react';

const KeywordsTable = () => {
  // Dữ liệu mẫu
  const keywords = [
    {
      id: 1,
      keyword: 'hack facebook',
      category: 'Bảo mật',
      source: 'Facebook',
      status: 'active',
      lastDetected: '2 giờ trước'
    },
    {
      id: 2,
      keyword: 'lừa đảo online',
      category: 'Lừa đảo',
      source: 'Google',
      status: 'pending',
      lastDetected: '5 giờ trước'
    },
    {
      id: 3,
      keyword: 'tấn công mạng',
      category: 'Bảo mật',
      source: 'Twitter',
      status: 'blocked',
      lastDetected: '1 ngày trước'
    },
    {
      id: 4,
      keyword: 'mã độc ransomware',
      category: 'Malware',
      source: 'Forum',
      status: 'active',
      lastDetected: '3 giờ trước'
    },
    {
      id: 5,
      keyword: 'phishing email',
      category: 'Lừa đảo',
      source: 'Email',
      status: 'pending',
      lastDetected: '12 giờ trước'
    }
  ];
  
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
      <table>
        <thead>
          <tr>
            <th>Từ khóa</th>
            <th>Danh mục</th>
            <th>Nguồn</th>
            <th>Trạng thái</th>
            <th>Phát hiện lần cuối</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((item) => (
            <tr key={item.id}>
              <td>{item.keyword}</td>
              <td>{item.category}</td>
              <td>{item.source}</td>
              <td>{renderStatus(item.status)}</td>
              <td>{item.lastDetected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeywordsTable;