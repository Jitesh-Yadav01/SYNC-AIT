import React, { useState } from "react";
import { useRoutes, useLocation } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import Login from "./pages/Auth/Login";
import ApplicationForm from "./components/ApplicationForm";
import { ViewProvider, useView } from "./context/ViewContext";


import { publicRoutes } from "./Routes/PublicRoutes.jsx";
import { protectedRoutes } from "./Routes/ProtectedRoutes.jsx";
import TePanel from "./pages/Profile/Te profile/TePanel";

function AppContent() {
  const routing = useRoutes([...publicRoutes, ...protectedRoutes]);
  const { currentView, setCurrentView } = useView();

  if (currentView === 'login') {
    return <Login />;
  }

  if (currentView === 'form') {
    return <ApplicationForm clubName="SYNC-AIT" abbr="SYNC" onClose={() => setCurrentView('default')} />;
  }

  if (currentView === 'te-dashboard') {
     return <TePanel />;
  }

  // Removed URL based check as per user request
  // const location = useLocation();
  // const isTeDashboard = location.pathname.startsWith('/profile/Te');

  return (
    <div className="app">
      {currentView !== 'fullscreen' && <Navbar onOpenLogin={() => setCurrentView('login')} onOpenForm={() => setCurrentView('form')} />}

      <div className={currentView !== 'fullscreen' ? "site-container" : ""}>
        <main className="main">
          {routing}
        </main>
      </div>

      {currentView !== 'fullscreen' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <AppContent />
    </ViewProvider>
  );
}
