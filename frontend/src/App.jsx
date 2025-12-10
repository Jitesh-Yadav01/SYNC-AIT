import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./sections/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./Routes/PublicRoutes.jsx";
import { protectedRoutes } from "./Routes/ProtectedRoutes.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const routing = useRoutes([...publicRoutes, ...protectedRoutes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Navbar />
      <div className="site-container">
        <main className="main">{routing}</main>
      </div>
      <Footer />
    </div>
  );
}
