import React, { useState } from 'react'
import '../styles/site.css'
import Home from './Home/Home'
import AboutUs from '../sections/Aboutus/Aboutus'
import Footer from '@/sections/Footer/Footer'
import { Navbar } from './Navbar/Navbar'
import SideBar from './Navbar/SideBar'

export default function MainContent(){
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="main">
      <SideBar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenLogin={() => setIsSidebarOpen(false)}
      />
      <Navbar
        onOpenLogin={() => setCurrentView('login')} 
        onOpenForm={() => setCurrentView('form')} 
        onOpenSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />
      <Home />
      <AboutUs />
      <Footer/>
    </main>
  )
}