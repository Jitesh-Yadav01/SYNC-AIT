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
import SePanel from "./pages/Profile/SE profile/SePanel";

import SideBar from "./components/Navbar/SideBar";

function AppContent({ isSidebarOpen, setIsSidebarOpen }) {
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

  if (currentView === 'se-dashboard') {
     return <SePanel />;
  }



  return (
    <div className="app">
      {currentView !== 'fullscreen' && (
        <>
          <Navbar 
            onOpenLogin={() => setCurrentView('login')} 
            onOpenForm={() => setCurrentView('form')} 
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
          <SideBar 
            open={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            onOpenLogin={() => {
              setIsSidebarOpen(false);
              setCurrentView('login');
            }}
          />
        </>
      )}

      <div className={currentView !== 'fullscreen' ? "site-container" : ""}>
        <main className="main">
          {routing}
        </main>
      </div>

      {currentView !== 'fullscreen' && <Footer />}
    </div>
  );
}

import ClickSpark from "./styles/ClickSpark";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ViewProvider>
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className={`app ${isSidebarOpen ? 'overflow-hidden' : ''}`}> 
          <AppContent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </ClickSpark>
    </ViewProvider>
  );
}
