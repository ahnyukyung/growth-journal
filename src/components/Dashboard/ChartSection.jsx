import React, { useState } from 'react';

export default function ChartSection({ entries }) {
  const getCategoryStats = (category) => {
    const catEntries = entries.filter(e => e.category === category);
    const total = catEntries.length;
    const successes = catEntries.filter(e => e.status === 'success').length;
    const rate = total > 0 ? Math.round((successes / total) * 100) : 0;
    return { total, successes, rate };
  };

  const reading = getCategoryStats('reading');
  const exercise = getCategoryStats('exercise');
  const study = getCategoryStats('study');
  const blog = getCategoryStats('blog');

  // Calculate success records for the last 7 days
  const getLast7DaysData = () => {
    const result = [];
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayEntries = entries.filter(e => e.date === dateStr);
      const successes = dayEntries.filter(e => e.status === 'success').length;
      
      result.push({
        dateStr,
        label: `${d.getMonth() + 1}/${d.getDate()}(${dayNames[d.getDay()]})`,
        successes,
        details: dayEntries.filter(e => e.status === 'success').map(e => e.category)
      });
    }
    return result;
  };

  const last7Days = getLast7DaysData();

  // Ring properties for circular progress
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Tooltip state for daily bar chart
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="charts-grid">
      {/* 1. 카테고리별 달성률 (원형 프로그레스) */}
      <div className="glass-card chart-card">
        <div className="chart-header">
          <h4 className="chart-title">카테고리별 달성률</h4>
        </div>
        
        <div className="chart-canvas-wrapper" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Reading */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
              <circle 
                cx="50" cy="50" r={radius} fill="transparent" 
                stroke="var(--color-reading)" strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (reading.rate / 100) * circumference}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
              <text x="50" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">
                {reading.rate}%
              </text>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-reading)' }}>📘 독서</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{reading.successes} / {reading.total} 성공</span>
          </div>

          {/* Exercise */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
              <circle 
                cx="50" cy="50" r={radius} fill="transparent" 
                stroke="var(--color-exercise)" strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (exercise.rate / 100) * circumference}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
              <text x="50" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">
                {exercise.rate}%
              </text>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-exercise)' }}>🏃 운동</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exercise.successes} / {exercise.total} 성공</span>
          </div>

          {/* Study */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
              <circle 
                cx="50" cy="50" r={radius} fill="transparent" 
                stroke="var(--color-study)" strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (study.rate / 100) * circumference}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
              <text x="50" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">
                {study.rate}%
              </text>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-study)' }}>✍️ 공부</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{study.successes} / {study.total} 성공</span>
          </div>

          {/* Blog */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
              <circle 
                cx="50" cy="50" r={radius} fill="transparent" 
                stroke="var(--color-blog)" strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (blog.rate / 100) * circumference}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
              <text x="50" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">
                {blog.rate}%
              </text>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-blog)' }}>🌐 블로그</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{blog.successes} / {blog.total} 성공</span>
          </div>
        </div>
      </div>

      {/* 2. 최근 7일 성공 추이 (막대 차트) */}
      <div className="glass-card chart-card">
        <div className="chart-header">
          <h4 className="chart-title">최근 7일 실천 추이</h4>
        </div>
        
        <div className="chart-canvas-wrapper" style={{ height: '180px' }}>
          <svg width="100%" height="180" viewBox="0 0 350 180" preserveAspectRatio="none">
            {/* Grid lines & labels */}
            {[0, 1, 2, 3, 4].map((yVal) => {
              const y = 140 - (yVal / 4) * 110;
              return (
                <g key={yVal}>
                  <line x1="30" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <text x="15" y={y + 4} fill="var(--text-muted)" fontSize="10" textAnchor="middle">{yVal}</text>
                </g>
              );
            })}

            {/* Bars */}
            {last7Days.map((day, idx) => {
              const barWidth = 24;
              const x = 45 + idx * 40;
              const barHeight = (day.successes / 4) * 110;
              const y = 140 - barHeight;

              let barColor = 'rgba(255, 255, 255, 0.05)';
              if (day.successes === 1) barColor = 'rgba(16, 185, 129, 0.3)';
              if (day.successes === 2) barColor = 'rgba(16, 185, 129, 0.5)';
              if (day.successes === 3) barColor = 'rgba(16, 185, 129, 0.75)';
              if (day.successes === 4) barColor = 'var(--color-success)';

              return (
                <g key={idx}>
                  <rect 
                    x={x} 
                    y={y} 
                    width={barWidth} 
                    height={barHeight > 0 ? barHeight : 2} 
                    fill={barColor}
                    rx="3"
                    className="svg-bar"
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      setTooltip({
                        x: x - 10,
                        y: y - 50,
                        label: day.label,
                        text: day.successes === 0 
                          ? '기록된 성공 없음' 
                          : `성공: ${day.details.map(c => c === 'reading' ? '독서' : c === 'exercise' ? '운동' : c === 'study' ? '공부' : '블로그').join(', ')}`
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  <text x={x + 12} y="155" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
                    {day.label.split('(')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {tooltip && (
            <div className="chart-tooltip" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}>
              <span style={{ fontWeight: '700' }}>{tooltip.label}</span>
              <span>{tooltip.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
