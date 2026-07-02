import React, { useState, useEffect } from 'react';
import { Check, X, BookOpen, Dumbbell, GraduationCap, Globe } from 'lucide-react';

export default function CategoryCard({ category, title, selectedDate, entries, onSave }) {
  const entryId = `${selectedDate}-${category}`;
  const currentEntry = entries.find(e => e.id === entryId);

  const [status, setStatus] = useState(null);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  // Sync state with selectedDate and entries changes
  useEffect(() => {
    if (currentEntry) {
      setStatus(currentEntry.status);
      setNote(currentEntry.note || '');
    } else {
      setStatus(null);
      setNote('');
    }
    setIsSaved(true);
  }, [selectedDate, currentEntry]);

  // Handle status toggle
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsSaved(false);
    
    const updatedEntry = {
      id: entryId,
      date: selectedDate,
      category,
      status: newStatus,
      note: note, // preserve current note content
      createdAt: currentEntry?.createdAt || new Date().toISOString()
    };
    onSave(updatedEntry);
    setIsSaved(true);
  };

  // Handle note typing
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setIsSaved(false);
  };

  // Save note on blur (when input field loses focus)
  const handleNoteBlur = () => {
    if (status) {
      const updatedEntry = {
        id: entryId,
        date: selectedDate,
        category,
        status,
        note: note,
        createdAt: currentEntry?.createdAt || new Date().toISOString()
      };
      onSave(updatedEntry);
      setIsSaved(true);
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'reading': return <BookOpen size={22} />;
      case 'exercise': return <Dumbbell size={22} />;
      case 'study': return <GraduationCap size={22} />;
      case 'blog': return <Globe size={22} />;
      default: return null;
    }
  };

  return (
    <div className={`glass-card category-card ${category}`}>
      <div className="category-header">
        <div className="category-icon-wrapper">
          {getIcon()}
        </div>
        <h3 className="category-title">{title}</h3>
      </div>

      <div className="toggle-group">
        <button 
          className={`toggle-btn success ${status === 'success' ? 'active' : ''}`}
          onClick={() => handleStatusChange('success')}
        >
          <Check size={16} />
          성공
        </button>
        <button 
          className={`toggle-btn failure ${status === 'failure' ? 'active' : ''}`}
          onClick={() => handleStatusChange('failure')}
        >
          <X size={16} />
          실패
        </button>
      </div>

      {status && (
        <div className="input-container">
          <label className="input-label">
            {status === 'success' ? '✨ 오늘 실천하며 느낀 점 / 배운 점' : '💡 실패 원인 및 내일의 다짐'}
          </label>
          <textarea
            className="note-textarea"
            value={note}
            onChange={handleNoteChange}
            onBlur={handleNoteBlur}
            placeholder={
              status === 'success' 
                ? '오늘 하루 어땠나요? 느낀 점을 자유롭게 기록해 보세요.' 
                : '왜 실패했는지 돌아보고, 내일은 어떻게 개선할지 적어보세요.'
            }
          />
          <div className={`save-status-badge ${isSaved ? 'saved' : ''}`}>
            {isSaved ? '✓ 저장됨' : '입력 중...'}
          </div>
        </div>
      )}
    </div>
  );
}
