import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import JournalTab from './components/Journal/JournalTab';
import DashboardTab from './components/Dashboard/DashboardTab';
import './App.css';

// Helper to get local date in YYYY-MM-DD format
const getLocalDateString = (dateObj = new Date()) => {
  const offset = dateObj.getTimezoneOffset();
  const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

function App() {
  const [entries, setEntries] = useLocalStorage('growth-journal-entries', []);
  const [activeTab, setActiveTab] = useState('journal');
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());

  // Save or update an entry
  const handleSaveEntry = (updatedEntry) => {
    setEntries((prevEntries) => {
      const existsIdx = prevEntries.findIndex((e) => e.id === updatedEntry.id);
      if (existsIdx > -1) {
        const next = [...prevEntries];
        next[existsIdx] = updatedEntry;
        return next;
      }
      return [...prevEntries, updatedEntry];
    });
  };

  // Delete an entry
  const handleDeleteEntry = (entryId) => {
    setEntries((prevEntries) => prevEntries.filter((e) => e.id !== entryId));
  };

  return (
    <div className="app-container">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="app-main">
        {activeTab === 'journal' ? (
          <JournalTab 
            selectedDate={selectedDate}
            entries={entries}
            onSaveEntry={handleSaveEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        ) : (
          <DashboardTab entries={entries} />
        )}
      </main>
    </div>
  );
}

export default App;
