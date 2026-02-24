// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ViewContext = createContext();

// export function ViewProvider({ children }) {
//   // Initialize from localStorage if available
//   const [currentView, setCurrentView] = useState(() => {
//     if (localStorage.getItem('te_dashboard_active') === 'true') return 'te-dashboard';
//     if (localStorage.getItem('se_dashboard_active') === 'true') return 'se-dashboard';
//     return 'default';
//   }); 
//   const [applicationData, setApplicationData] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     // Only reset if we are NOT in persistent dashboard mode
//     const isTeActive = localStorage.getItem('te_dashboard_active') === 'true';
//     const isSeActive = localStorage.getItem('se_dashboard_active') === 'true';

//     if (!isTeActive && !isSeActive) {
//         if (currentView !== 'login' && currentView !== 'form') {
//              setCurrentView('default');
//         }
//         setApplicationData(null);
//     }
//   }, [location, currentView]);

//   return (
//     <ViewContext.Provider value={{ currentView, setCurrentView, applicationData, setApplicationData }}>
//       {children}
//     </ViewContext.Provider>
//   );
// }

// export function useView() {
//   const context = useContext(ViewContext);
//   if (context === undefined) {
//     throw new Error('useView must be used within a ViewProvider');
//   }
//   return context;
// }
