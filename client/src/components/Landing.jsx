import React from 'react'
import styles from './Landing.module.css'
import videoBg from './food.mp4'

export default function Landing() {
  return (
    <section className={styles.showcase} >
      <header>
        <h2 className={styles.logo}>API Food</h2>
        <div className={styles.toggle}></div>
      </header>

      <video src={videoBg} autoPlay loop muted />


      <div className={styles.overlay}></div>

      <div className={styles.text}>
        <h2>Food API</h2>
        <h3>Spoonacular</h3>
        <p>A SPA Individual Project</p>
        {/* <a href="">Enter</a> */}
        <a href="./">Enter</a>
      </div>


    </section >
  )
}
