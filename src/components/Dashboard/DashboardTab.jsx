import React, { useState } from 'react';
import StatOverview from './StatOverview';
import ChartSection from './ChartSection';
import ContributionGrid from './ContributionGrid';

export default function DashboardTab({ entries }) {
  const [filter, setFilter] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly' | 'overall'

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h3 className="section-title" style={{ marginBottom: 0 }}>📊 성장 성과 대시보드</h3>
        <div className="filter-group">
          <button 
            className={`filter-btn ${filter === 'weekly' ? 'active' : ''}`}
            onClick={() => setFilter('weekly')}
          >
            주간
          </button>
          <button 
            className={`filter-btn ${filter === 'monthly' ? 'active' : ''}`}
            onClick={() => setFilter('monthly')}
          >
            월간
          </button>
          <button 
            className={`filter-btn ${filter === 'yearly' ? 'active' : ''}`}
            onClick={() => setFilter('yearly')}
          >
            연간
          </button>
          <button 
            className={`filter-btn ${filter === 'overall' ? 'active' : ''}`}
            onClick={() => setFilter('overall')}
          >
            전체
          </button>
        </div>
      </div>

      <StatOverview entries={entries} filter={filter} />
      
      <ChartSection entries={entries} />
      
      <ContributionGrid entries={entries} />
    </div>
  );
}
