"use client";

import styles from "./about.module.css";
import useAutoLogin from "../../hooks/useAutoLogin";
import Loader from "../../components/Loader/loader";

export default function Home() {
  const loading = useAutoLogin();

  return loading ? (
    <Loader />
  ) : (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.h1mainpage}>Children Far From Home</h1>
        <p className={styles.description}>
          Helping children who are far from home find comfort, connection, and  
          support213333333333333333333333333333333333333333333333311111111111111111111111111111111133333333322222.
        </p>
        <button className={styles.shopButton}>Learn More</button>
      </div>
    </main>
  );
}
