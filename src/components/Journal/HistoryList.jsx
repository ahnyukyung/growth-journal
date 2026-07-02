import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

export default function HistoryList({ entries, onDelete }) {
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return a.category.localeCompare(b.category);
  });

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'reading': return '독서';
      case 'exercise': return '운동';
      case 'study': return '공부';
      case 'blog': return '블로그';
      default: return category;
    }
  };

  const formatDate = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1]}.${parts[2]}`;
    }
    return dateStr;
  };

  return (
    <div className="glass-card history-section">
      <h3 className="section-title">최근 기록 내역</h3>
      {sortedEntries.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={24} style={{ marginBottom: '8px', opacity: 0.5 }} />
          <p>아직 등록된 기록이 없습니다. 위의 카드에서 오늘 성과를 기록해 보세요!</p>
        </div>
      ) : (
        <div className="history-list">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="history-item">
              <div className={`history-badge ${entry.category}`}></div>
              <div className="history-details">
                <div className="history-meta">
                  <span className="date-text" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {formatDate(entry.date)}
                  </span>
                  <span className={`history-category ${entry.category}`}>
                    {getCategoryLabel(entry.category)}
                  </span>
                  <span className={`history-status-tag ${entry.status}`}>
                    {entry.status === 'success' ? '성공' : '실패'}
                  </span>
                </div>
                {entry.note && (
                  <p className="history-note">{entry.note}</p>
                )}
              </div>
              <button 
                className="history-delete-btn"
                onClick={() => onDelete(entry.id)}
                title="기록 삭제"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
