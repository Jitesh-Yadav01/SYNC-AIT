import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ClubCard from './ClubCard'
import ApplicationForm from '../ApplicationForm'
import { ArrowLeft } from 'lucide-react'
import './club.css'
// import { useView } from '../../context/ViewContext';

export default function MainContent(){
  const navigate = useNavigate();
  // const { setCurrentView, setApplicationData } = useView();
  const [selectedClub, setSelectedClub] = useState(null);

  const handleApply = (abbr, name) => {
    setSelectedClub({ abbr, name });
  }

  const handleClose = () => {
    setSelectedClub(null);
  }
  
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function fetchClubs() {
      setLoading(true)
      try {
        const res = await fetch('/api/clubs.json', { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Failed to fetch clubs: ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) setClubs(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Error fetching clubs:', err)
        if (!cancelled) setClubs([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchClubs()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  if(loading){
    return(
      <p>Loading...</p>
    )
  }

  if (selectedClub) {
    return (
      <ApplicationForm
        clubName={selectedClub.name}
        abbr={selectedClub.abbr}
        onClose={handleClose}
      />
    );
  }

  return (
    <main className="main">
      <section className="clubs-page" id="clubs" aria-label="Clubs list">
        <div className="flex items-center gap-2 mb-[-45px] mt-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 ml-3 md:ml-40 text-sm md:text-lg font-bold text-gray-700 hover:text-black transition-colors bg-blue-400 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </button>
        </div>
        <h2 className='text-center text-2xl md:text-4xl font-bold pt-2 md:pt-0'>Explore <span className="text-red-600">Clubs.</span></h2>
        <div className="cards">
          {clubs.map(c => (
            <ClubCard key={c.abbr} {...c} onApply={handleApply} />
          ))}
        </div>
      </section>
    </main>
  )
}
