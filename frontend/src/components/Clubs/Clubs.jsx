import React, { useState, useEffect } from 'react'
import ClubCard from './ClubCard'
import ApplicationForm from '../ApplicationForm'
import './club.css'
// import { useView } from '../../context/ViewContext';

export default function MainContent(){
  // const { setCurrentView, setApplicationData } = useView();
  
  const handleApply = (abbr, name) => {
    setApplicationData({ abbr, name });
    setCurrentView('form');
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

  return (
    <main className="main">
      <section className="clubs-page" id="clubs" aria-label="Clubs list">
        <h2 className='text-center text-4xl font-bold'>Explore <span className="text-red-600">Clubs.</span></h2>
        <div className="cards">
          {clubs.map(c => (
            <ClubCard key={c.abbr} {...c} onApply={handleApply} />
          ))}
        </div>
      </section>
    </main>
  )
}
