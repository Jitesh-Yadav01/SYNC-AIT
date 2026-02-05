import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import SyncAIT from "../../assets/syncaithome.svg"

export default function Home() {
	
	const navigate = useNavigate()
	return (

		<section id="home" className="home-hero" >
			
			<div className="page-head flex  font-[Poppins]">
				<div className='hero-div'  >
					<img src={SyncAIT} alt=""  className='syncAITdesigned'  style={{margin:"40px 0 0 0 "}}/>
					<h1>A Place where every Club Finds Home</h1>
					</div>
				</div>
				

		</section>
	)
}