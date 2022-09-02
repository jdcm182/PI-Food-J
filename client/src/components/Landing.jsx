import React from 'react'
import styles from './Landing.module.css'
import videoBg from './food.mp4'

export default function Landing() {
  return (
    <section className={styles.showcase} >
      <header>
        <h2 className={styles.logo}>API Test</h2>
        <div className={styles.toggle}></div>
      </header>

      <video src={videoBg} autoPlay loop muted />


      <div className={styles.overlay}></div>

      <div className={styles.text}>
        <h2>Food</h2>
        <h3>Experimenting with PI</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam officiis commodi impedit optio. Explicabo
          voluptates unde reprehenderit quibusdam, maiores dolore.</p>
        {/* <a href="">Enter</a> */}
        <a href="./">Enter</a>
      </div>


    </section >
  )
}
