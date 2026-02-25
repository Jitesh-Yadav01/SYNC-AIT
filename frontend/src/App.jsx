import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import ClickSpark from "./styles/ClickSpark";
import TargetCursor from "./styles/TargetCursor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRoutes } from "./Routes/PublicRoutes.jsx";
import { protectedRoutes } from "./Routes/ProtectedRoutes.jsx";
import SideBar from "./components/Navbar/SideBar";

function AppContent({ isSidebarOpen, setIsSidebarOpen }) {
  const routing = useRoutes([...publicRoutes, ...protectedRoutes]);
  return (
    <div className="app">
        <>
          <SideBar 
            open={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            onOpenLogin={() => {
              setIsSidebarOpen(false);
              setCurrentView('login');
            }}
          />
        </>

      <div>
        <main className="main">
          {routing}
        </main>
      </div>
    </div>
  );
}



export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />
        <TargetCursor 
          targetSelector="button, a, .cursor-target, .hover-circle, input, label"
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        <div className={`app ${isSidebarOpen ? 'overflow-hidden' : ''}`}> 
          <AppContent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </ClickSpark>
  );
}
