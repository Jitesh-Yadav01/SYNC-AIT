import React from 'react'
import '../styles/site.css'
import Home from './Home/Home'
import ContactUs from '../sections/ContactUs/ContactUs'
import AboutUs from '../sections/Aboutus/Aboutus'
import Footer from '@/sections/Footer/Footer'
import { Navbar } from './Navbar/Navbar'

export default function MainContent(){
  return (
    <main className="main">
      <Navbar 
                  onOpenLogin={() => setCurrentView('login')} 
                  onOpenForm={() => setCurrentView('form')} 
                  onOpenSidebar={() => setIsSidebarOpen(true)}
      />
      <Home />
      <AboutUs />
      <ContactUs />
      <Footer/>
    </main>
  )
}