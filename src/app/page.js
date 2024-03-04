"use client";

import image from "../images/login.jpg";
import styles from "./page.module.css";
import useAutoLogin from "../hooks/useAutoLogin";
import Loader from "../components/Loader/loader";
import ParticlesBackground from "../components/LandingPageParticalAnimation/ParticlesBackground";
import Navbar from "../components/navbar/navbar";
import HomeText from "./HomeText/page";
import ProductCard from "../components/ProductCard/page";
export default function Home() {
  const loading = useAutoLogin();

  return loading ? (
    <Loader />
  ) : (
    <>
      <main className={styles.main}>
        <Navbar />
        <div>
          <ParticlesBackground></ParticlesBackground>
        </div>
      </main>
      <h2 className={styles.homeHeading}>Featured Products</h2>
      <div className={styles.container} id="container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}
