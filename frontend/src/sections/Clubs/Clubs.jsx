import React, { useState, useEffect } from 'react'
import ClubCard from '../../components/ClubCard'
import ApplicationForm from '../../components/ApplicationForm'
import './club.css'

const defaultClubs = [
  {
    abbr: 'OSS',
    name: 'OSS Club (Open Source Software Club)',
    desc: 'Encouraging students to contribute to open source projects and learn collaborative software development.',
    focusAreas: ['Open source contribution workflows', 'Version control & collaboration (Git/GitHub)', 'Documentation, testing and CI'],
    activities: ['INNERVE', 'FSOC', 'Graphica ', 'Spark', 'Internal SIH ', 'Replica'],
    who: 'FE,SE'
  },
  {
    abbr: 'GDG',
    name: 'GDG AIT Pune (Google Developer Group)',
    desc: 'Community-driven developer group focused on practical developer skills and technology learning.',
    focusAreas: ['Web & mobile development', 'Cloud and architecture', 'Developer tooling and best practices'],
    activities: ['Frontend Jams', 'Backend Jams', 'FSOC', 'Enliven', 'FSOC', 'Google Cloud Workshop', 'Android Development Session', 'Tech Talks', 'Developer Meetups'],
    who: 'FE,SE'
  },
  {
    abbr: 'CP',
    name: 'CP Club (Competitive Programming Club)',
    desc: 'Focused training and practice for programming contests and technical interviews.',
    focusAreas: ['Data structures & algorithms', 'Problem-solving strategies', 'Contest practice and timing'],
    activities: ['CODEFT 4.0', 'CRACK 5.1', 'CRACK 5.2', 'KICKSTARTER'],
    who: 'FE,SE'
  }
]

// const clubs = [
//   {
//     abbr:'OSS',
//     name:'OSS Club (Open Source Software Club)',
//     desc:'Encouraging students to contribute to open source projects and learn collaborative software development.',
//     focusAreas:['Open source contribution workflows','Version control & collaboration (Git/GitHub)','Documentation, testing and CI'],
//     activities:['INNERVE','FSOC','Graphica ', 'Spark','Internal SIH ', 'Replica'],
//     who:'FE,SE',
    
//   },
//   {
//     abbr:'GDG',
//     name:'GDG AIT Pune (Google Developer Group)',
//     desc:'Community-driven developer group focused on practical developer skills and technology learning.',
//     focusAreas:['Web & mobile development','Cloud and architecture','Developer tooling and best practices'],
//     activities:['Frontend Jams','Backend Jams','FSOC', 'Enliven','FSOC','Google Cloud Workshop','Android Development Session','Tech Talks','Developer Meetups'],
//     who:'FE,SE',
   
//   },
//   {
//     abbr:'CP',
//     name:'CP Club (Competitive Programming Club)',
//     desc:'Focused training and practice for programming contests and technical interviews.',
//     focusAreas:['Data structures & algorithms','Problem-solving strategies','Contest practice and timing'],
//     activities:['CODEFT 4.0','CRACK 5.1','CRACK 5.2','KICKSTARTER'],
//     who:'FE,SE',
  
//   }
// ]

export default function MainContent(){
  const [selectedClub, setSelectedClub] = useState(null)
  
  const handleApply = (abbr, name) => {
    setSelectedClub({ abbr, name })
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
        if (!cancelled) setClubs(Array.isArray(data) ? data : defaultClubs)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.warn('Could not load clubs from server, using defaults. Error:', err)
        if (!cancelled) setClubs(defaultClubs)
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
  
  if (selectedClub) {
    return (
      <ApplicationForm
        clubName={selectedClub.name}
        abbr={selectedClub.abbr}
        onClose={() => setSelectedClub(null)}
      />
    )
  }

  if(loading){
    return(
      <p>Loading...</p>
    )
  }

  return (
    <main className="main">
      <section className="clubs-page" id="clubs" aria-label="Clubs list">
        <div className="cards">
          {clubs.map(c => (
            <ClubCard key={c.abbr} {...c} onApply={handleApply} />
          ))}
        </div>
      </section>
    </main>
  )
}
