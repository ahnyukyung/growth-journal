import React, { useState } from 'react';

export default function ContributionGrid({ entries }) {
  const getGridData = () => {
    const grid = [];
    const today = new Date();
    
    // Calculate the start date (364 days ago) and roll back to the preceding Sunday
    const startDate = new Date();
    startDate.setDate(today.getDate() - 364);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const entriesMap = {};
    entries.forEach(e => {
      if (e.status === 'success') {
        entriesMap[e.date] = (entriesMap[e.date] || 0) + 1;
      }
    });

    const currentDate = new Date(startDate);
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = entriesMap[dateStr] || 0;
        
        week.push({
          dateStr,
          count,
          formattedDate: `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      grid.push(week);
    }
    return grid;
  };

  const gridData = getGridData();
  const [tooltip, setTooltip] = useState(null);

  const getLevel = (count) => {
    if (count === 0) return 'level-0';
    if (count === 1) return 'level-1';
    if (count === 2) return 'level-2';
    return 'level-3';
  };

  return (
    <div className="glass-card contribution-card">
      <div className="chart-header">
        <h4 className="chart-title">연간 달성도 (성공 잔디)</h4>
      </div>

      <div style={{ position: 'relative' }}>
        <div className="contribution-grid-wrapper">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Weekday indicators */}
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gap: '3px', fontSize: '9px', color: 'var(--text-muted)', paddingRight: '4px' }}>
              <span>일</span>
              <span></span>
              <span>화</span>
              <span></span>
              <span>목</span>
              <span></span>
              <span>토</span>
            </div>

            {/* Grid display */}
            <div style={{ display: 'flex', gap: '3px' }}>
              {gridData.map((week, wIdx) => (
                <div key={wIdx} style={{ display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gap: '3px' }}>
                  {week.map((day, dIdx) => (
                    <div 
                      key={dIdx}
                      className={`contribution-cell ${getLevel(day.count)}`}
                      onMouseEnter={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        // Find horizontal scroll position of container to offset tooltip
                        const container = e.target.closest('.contribution-grid-wrapper');
                        const scrollLeft = container ? container.scrollLeft : 0;
                        setTooltip({
                          x: rect.left - rect.width - 200 + scrollLeft, // fallback approximate calculations
                          styleX: rect.left - rect.width/2 - 10,
                          styleY: rect.top - 120, // relative to viewport
                          text: `${day.formattedDate}: ${day.count}개 성공`
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {tooltip && (
          <div 
            className="chart-tooltip" 
            style={{ 
              position: 'fixed',
              left: `${tooltip.styleX}px`, 
              top: `${tooltip.styleY}px`,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <span>{tooltip.text}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
        <span>미흡</span>
        <div className="contribution-cell level-0" style={{ cursor: 'default' }}></div>
        <div className="contribution-cell level-1" style={{ cursor: 'default' }}></div>
        <div className="contribution-cell level-2" style={{ cursor: 'default' }}></div>
        <div className="contribution-cell level-3" style={{ cursor: 'default' }}></div>
        <span>우수</span>
      </div>
    </div>
  );
}
