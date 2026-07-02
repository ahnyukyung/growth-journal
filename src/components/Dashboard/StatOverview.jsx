import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

export default function StatOverview({ entries, filter }) {
  // Filter entries based on the active tab (weekly, monthly, yearly, overall)
  const getFilteredEntries = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return entries.filter(e => {
      const entryDate = new Date(e.date);
      const diffTime = Math.abs(today - entryDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (filter === 'weekly') {
        return diffDays <= 7;
      } else if (filter === 'monthly') {
        return diffDays <= 30;
      } else if (filter === 'yearly') {
        return diffDays <= 365;
      }
      return true; // overall
    });
  };

  const filtered = getFilteredEntries();
  const totalCount = filtered.length;
  const successes = filtered.filter(e => e.status === 'success').length;
  const successRate = totalCount > 0 ? Math.round((successes / totalCount) * 100) : 0;

  // Streak calculations (requires evaluating consecutive calendar dates)
  const getStreak = (category) => {
    const catSuccessDates = entries
      .filter(e => e.category === category && e.status === 'success')
      .map(e => e.date);
    
    if (catSuccessDates.length === 0) return 0;
    
    // Sort descending
    const uniqueDates = [...new Set(catSuccessDates)].sort((a, b) => new Date(b) - new Date(a));
    
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // If the latest success date is not today and not yesterday, current streak is 0
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
      return 0;
    }
    
    let streak = 0;
    let currentDate = new Date(uniqueDates[0]);
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDateStr = currentDate.toISOString().split('T')[0];
      if (uniqueDates.includes(checkDateStr)) {
        streak++;
        // Subtract one day to check the previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const readingStreak = getStreak('reading');
  const exerciseStreak = getStreak('exercise');
  const studyStreak = getStreak('study');
  const blogStreak = getStreak('blog');

  const getFilterLabel = () => {
    switch (filter) {
      case 'weekly': return '최근 7일';
      case 'monthly': return '최근 30일';
      case 'yearly': return '최근 1년';
      default: return '전체';
    }
  };

  return (
    <div className="stats-overview-grid">
      <div className="glass-card stat-card">
        <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={16} color="#3b82f6" />
          종합 달성률
        </span>
        <span className="stat-value">
          {successRate}%
        </span>
        <span className="stat-subtext">
          {successes}회 성공 / {totalCount}회 기록 ({getFilterLabel()})
        </span>
      </div>

      <div className="glass-card stat-card" style={{ borderLeft: '4px solid var(--color-reading)' }}>
        <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} color="var(--color-reading)" />
          독서 스트릭
        </span>
        <span className="stat-value">
          {readingStreak}일 연속
        </span>
        <span className="stat-subtext">매일 지혜 쌓기!</span>
      </div>

      <div className="glass-card stat-card" style={{ borderLeft: '4px solid var(--color-exercise)' }}>
        <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} color="var(--color-exercise)" />
          운동 스트릭
        </span>
        <span className="stat-value">
          {exerciseStreak}일 연속
        </span>
        <span className="stat-subtext">더 건강한 육체를 위해!</span>
      </div>

      <div className="glass-card stat-card" style={{ borderLeft: '4px solid var(--color-study)' }}>
        <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} color="var(--color-study)" />
          공부 스트릭
        </span>
        <span className="stat-value">
          {studyStreak}일 연속
        </span>
        <span className="stat-subtext">배움은 끝이 없습니다!</span>
      </div>

      <div className="glass-card stat-card" style={{ borderLeft: '4px solid var(--color-blog)' }}>
        <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} color="var(--color-blog)" />
          블로그 스트릭
        </span>
        <span className="stat-value">
          {blogStreak}일 연속
        </span>
        <span className="stat-subtext">기록하는 삶은 아름답습니다!</span>
      </div>
    </div>
  );
}
