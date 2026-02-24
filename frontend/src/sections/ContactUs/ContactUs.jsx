import React from 'react'
import './ContactUs.css'
import collabBg from '../../assets/CollabBG.png'
// import { useView } from '../../context/ViewContext';

export default function ContactUs() {
  // const { setCurrentView } = useView();

  return (
    <section id="contact" className="contact-section" style={{ backgroundImage: `url(${collabBg})` }}>
      <div className="contact-container">
        <div className="contact-content">
          <h1 className="contact-title">Want To Join US</h1>
          <h1 className="contact-subtitle">Just Fill Out The Form</h1>
        </div>
        <div className="contact-button-wrapper">
          <button onClick={() => setCurrentView('form')} className="fill-form-btn">
            FILL THE FORM
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
