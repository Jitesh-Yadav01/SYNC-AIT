import React, { useState, useEffect } from 'react'
import ClubCard from '../../../components/ClubCard'
import './club.css'

export default function ClubList({ onApply }) {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    async function fetchClubs() {
      try {
        const res = await fetch('/api/clubs.json')
        const data = await res.json()
        setClubs(data)
      } catch (err) {
        console.error('Error fetching clubs:', err)
      }
    }
    fetchClubs()
  }, [])

  return (
    <section className="club-list" aria-label="Available clubs">
      <div className="cards">
        {clubs.map(club => (
          <ClubCard
            key={club.abbr}
            abbr={club.abbr}
            name={club.name}
            fullForm={club.fullForm}
            img={club.img}
            desc={club.desc}
            focusAreas={club.focusAreas}
            media={club.media}
            activities={club.activities}
            who={club.who}
            onApply={onApply}
          />
        ))}
      </div>
    </section>
  )
}
