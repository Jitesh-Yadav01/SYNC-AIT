import bgImage from '../../assets/bg-image.png'
import clubLogos from '../../assets/clublogos'

const Footer = () => {
  return (
    <footer className="flex justify-center items-center relative overflow-hidden">
      {/* overlay & bottom-anchored skyline */}
      <div className="absolute inset-0 -z-20 w-full h-full pointer-events-none">
        {/* subtle full-area overlay to dim background — kept light so skyline shows through */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/45 via-slate-900/15 to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-between items-start text-black">

          {/* left: brand + actions */}
          <div className="flex-1 flex flex-col justify-between min-h-36 md:min-h-44">
            <div>
              <div className="flex items-start gap-4">
                <img src={clubLogos.googleDevelopers} alt="Google Developers" className="w-14 h-14 object-contain" />
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Google Developer Student Clubs</h3>
                  <p className="mt-1 text-sm text-black max-w-sm">A tech-driven student community at Army Institute of Technology — build, learn & ship projects together.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex gap-3">
              <a className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-linear-to-r from-sky-600 to-indigo-600 text-white font-semibold shadow hover:brightness-95 transition" href="#">Join our events</a>
              <a className="inline-flex items-center justify-center px-4 py-2 rounded-lg border bg-gray-300 border-gray-400 text-black font-medium hover:bg-white/5 transition" href="#">Contact us</a>
            </div>
          </div>

          {/* middle: navigation */}
          <div className="flex-1 mt-4 md:mt-0 md:pl-6">
            <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Explore</h4>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm text-black/80">
                <a className="block text-black/80">Home</a>
                <a className="block text-black/80">About</a>
                <a className="block text-black/80">Events</a>
                <a className="block text-black/80">Team</a>
            </div>
          </div>

          {/* right: contact */}
            <div className="flex-1 mt-4 md:mt-0 md:pl-6 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Get in touch</h4>
              <div className="mt-3 text-sm text-black/80 space-y-2">
                <div>Army Institute of Technology, Pune<br/>Maharashtra - 411015</div>
                <div>Mobile: <a className="text-black font-semibold">9649959730</a></div>
                <div>Email: <a className="text-black font-semibold">gdsc@aitpune.edu.in</a></div>
              </div>
            </div>

            <div className="mt-4 text-sm text-black/85 text-center md:text-right">We’re here to help — feel free to reach out anytime.</div>
          </div>
        </div>

        {/* copyright */}
          <div className="mt-4 text-sm text-black/80 text-center md:text-left">© {new Date().getFullYear()} Google Developer Student Clubs — Army Institute of Technology, Pune</div>
        {/* bottom-anchored skyline image */}
        <div className="absolute inset-x-0 bottom-0 h-28 md:h-36 w-full -z-10 pointer-events-none">
          <img src={bgImage} alt="skyline" className="w-full h-full object-cover object-bottom opacity-40 block" />
        </div>
      </div>
    </footer>
  )
}

export default Footer