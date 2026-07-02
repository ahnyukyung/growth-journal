import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function Header({ selectedDate, setSelectedDate }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[date.getDay()];
    
    return `${yyyy}년 ${mm}월 ${dd}일 (${day})`;
  };

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <header className="app-header">
      <div className="brand">
        <h1>🌱 Growth Journal</h1>
      </div>
      <div className="date-indicator">
        <button className="date-nav-btn" onClick={handlePrevDay} title="이전 날짜">
          <ChevronLeft size={18} />
        </button>
        <span className="date-text">{formatDate(selectedDate)}</span>
        <button className="date-nav-btn" onClick={handleNextDay} title="다음 날짜">
          <ChevronRight size={18} />
        </button>
        <button 
          className="date-nav-btn" 
          onClick={handleToday} 
          title="오늘 날짜로"
          style={{ fontSize: '12px', fontWeight: '700', width: 'auto', padding: '0 8px', borderRadius: '6px' }}
        >
          오늘
        </button>
      </div>
    </header>
  );
}
