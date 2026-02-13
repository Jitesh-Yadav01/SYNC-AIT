import React from 'react'
import './Footer.css'
import bgImage from '../../assets/bg-image.png'
import clubLogos from '../../../public/clublogos'


import LogoLoop from './LogoLoop';
import { SiGoogle, SiTensorflow, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiKotlin, SiAndroid, SiFlutter } from 'react-icons/si';

const techLogos = [
   { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiGoogle />, title: "Google", href: "https://about.google/" },
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org/" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com/" },
  { node: <SiKotlin />, title: "Kotlin", href: "https://kotlinlang.org/" },
  { node: <SiAndroid />, title: "Android", href: "https://www.android.com/" },
  { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev/" },
];

import CurvedLoop from './CurvedLoop';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>
      <div className="footer-inner">
        <div className="mb-4">
          <CurvedLoop 
            marqueeText="Made  ✦  With  ✦ ❤️ ✦ By ✦ GDG ✦ X ✦ "
            speed={2}
            curveAmount={40}
            direction="left"
            interactive
            className="text-white fill-white"
          />
        </div>
        <div className="mb-12">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="right"
            logoHeight={32}
            gap={40}
            hoverSpeed={10}
            pauseOnHover={false}
            scaleOnHover
            fadeOut
            className="opacity-100 bg-black h-16 w-full grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
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
              <a className="btn-primary" href="/clubs">Join our clubs</a>
              <a className="btn-secondary" href="#contact">Contact us</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="col-title">Explore</h4>
            <div className="link-grid">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#clubs">Clubs</a>
              <a href="/developers">Developers</a>
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

      </div>
      <div className="footer-skyline">
        <img src={bgImage} alt="skyline" />
      </div>
    </footer>
  )
}
