"use client";

import Image from "next/image";
import styles from "./page.module.css";
import useAutoLogin from "../hooks/useAutoLogin";
import Loader from "../components/Loader/loader";
import ParticlesBackground from "../components/LandingPageParticalAnimation/ParticlesBackground";

export default function Home() {
  const loading = useAutoLogin();

  return loading ? (
    <Loader />
  ) : (
    <main className={styles.main}>
      <ParticlesBackground></ParticlesBackground>
      <div className={styles.content}>
        <h1 className={styles.h1mainpage}>SpiderMan Far From Home</h1>
        <p className={styles.description}>
          Helping children who are far from home find comfort, connection, and
          support.
        </p>
        <button className={styles.shopButton}>Learn More</button>
      </div>
    </main>
  );
}
