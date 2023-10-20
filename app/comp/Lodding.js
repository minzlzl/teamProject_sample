import React, { useEffect } from 'react'

export default function Lodding() {
  
  useEffect(()=>{
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
},[])

  return (
    <div className='Lodding'>
        <video className='bg_video' autoPlay muted loop playsInline src='/img/background.mp4'/>
        <div>
            <h1> Loading... </h1>
            <img src="/img/intro/intro.gif" alt='' />
        </div>
      </div>
  )
}
