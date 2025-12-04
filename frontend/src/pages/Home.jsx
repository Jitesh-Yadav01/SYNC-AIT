import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'

export default function Home() {

	/* 
	Dont set the loader before final deployment. It wastes time and annoys me
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return <Loader />
	}
	*/

	return (
		<section id="home" className="home-hero">
			<div className="page-head">
				<div>
					<h1 className="section-title title-dark">SYNC</h1>
					<h1 className="section-title title-dark">AIT PUNE</h1>
					<p className="lead">Explore student-run clubs that help you build, learn and grow.</p>
				</div>
			</div>
		</section>
	)
}