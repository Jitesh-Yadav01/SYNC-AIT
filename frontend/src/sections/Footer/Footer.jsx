import React from 'react'
import './Footer.css'
import bgImage from '../../assets/bg-image.png'
import clubLogos from '../../../public/clublogos'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <img src={clubLogos.googleDevelopers} alt="Google Developers" className="brand-logo" />
              <div>
                <h3 className="brand-title">Google Developer Student Clubs</h3>
                <p className="brand-desc">A tech-driven student community at Army Institute of Technology — build, learn and ship projects together.</p>
              </div>
            </div>
            <div className="footer-actions">
              <a className="btn-primary" href="#calendar">Join our events</a>
              <a className="btn-secondary" href="#contact">Contact us</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="col-title">Explore</h4>
            <div className="link-grid">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#clubs">Clubs</a>
              <a href="#calendar">Calendar</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="col-title">Get in touch</h4>
            <div className="contact-list">
              <div>Army Institute of Technology, Pune<br />Maharashtra - 411015</div>
              <div>Mobile: <a>9649959730</a></div>
              <div>Email: <a>gdsc@aitpune.edu.in</a></div>
            </div>
            <div className="help-text">We’re here to help — feel free to reach out anytime.</div>
          </div>
        </div>

        <div className="copyright">© {new Date().getFullYear()} Google Developer Student Clubs — Army Institute of Technology, Pune</div>

        <div className="footer-skyline">
          <img src={bgImage} alt="skyline" />
        </div>
      </div>
    </footer>
  )
}
