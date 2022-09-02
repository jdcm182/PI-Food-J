import React from 'react'
import style from './Landing.module.css'
import videoBg from './food.mp4'

export default function Landing() {
  return (
    <div className={style.wrapper} >


      <video src={videoBg} autoPlay loop muted />

      <div className={style.top}>
        <h2>Henry</h2>
        <h3>Videogames</h3>

        <a href="./">Enter</a>
      </div>


    </div >
  )
}
