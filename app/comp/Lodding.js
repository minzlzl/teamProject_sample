import React from 'react'

export default function Lodding() {
  return (
    <div className='Lodding'>
        <video className='bg_video' autoPlay muted loop playsInline src='/img/background.mp4'/>
        <div>
            <h1> Lodding... </h1>
            <img src="/img/intro/intro.gif" alt='' />
        </div>
      </div>
  )
}
