"use client";


import styles from "./home.module.css";
import React from 'react'

const HomeText = () => {
  return (
    <div className={styles.content}>
    <h1 className={styles.h1mainpage}>SpiderMan Far From Home</h1>
    <p className={styles.description}>
      Helping children who are far from home find comfort, connection, and support .
    </p>
    <button className={styles.shopButton}>Learn More</button>
  </div>
  )
}

export default HomeText