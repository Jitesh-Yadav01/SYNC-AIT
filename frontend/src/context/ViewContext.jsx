import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [currentView, setCurrentView] = useState('default'); // 'default', 'login', 'form'
  const [applicationData, setApplicationData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setCurrentView('default');
    setApplicationData(null);
  }, [location]);

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView, applicationData, setApplicationData }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
