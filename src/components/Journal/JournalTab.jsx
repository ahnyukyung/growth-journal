import React from 'react';
import CategoryCard from './CategoryCard';
import HistoryList from './HistoryList';

export default function JournalTab({ selectedDate, entries, onSaveEntry, onDeleteEntry }) {
  const categories = [
    { key: 'reading', title: '📘 독서' },
    { key: 'exercise', title: '🏃 운동' },
    { key: 'study', title: '✍️ 공부' },
    { key: 'blog', title: '🌐 블로그' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="journal-grid">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.key}
            category={cat.key}
            title={cat.title}
            selectedDate={selectedDate}
            entries={entries}
            onSave={onSaveEntry}
          />
        ))}
      </div>
      
      <HistoryList 
        entries={entries} 
        onDelete={onDeleteEntry}
      />
    </div>
  );
}
