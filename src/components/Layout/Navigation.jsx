import React from 'react';
import { BookOpen, BarChart3 } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <div className="nav-container">
      <button 
        className={`nav-tab ${activeTab === 'journal' ? 'active' : ''}`}
        onClick={() => setActiveTab('journal')}
      >
        <BookOpen size={18} />
        성장 기록
      </button>
      <button 
        className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
      >
        <BarChart3 size={18} />
        통계 대시보드
      </button>
    </div>
  );
}
