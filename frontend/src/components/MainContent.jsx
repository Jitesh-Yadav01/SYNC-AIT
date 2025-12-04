import React from 'react'
import '../styles/site.css'
import Home from '../pages/Home'
import Clubs from '../sections/Clubs/Clubs'
import ContactUs from '../pages/ContactUs/ContactUs'

export default function MainContent(){
  return (
    <main className="main">
      <Home />
      <Clubs />
      <ContactUs />
    </main>
  )
}
