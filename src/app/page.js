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
    <main>
      <ParticlesBackground></ParticlesBackground>
      <div>
        <h1 className={styles.h1mainpage}>Particles.JS</h1>
      </div>
    </main>
  );
}
