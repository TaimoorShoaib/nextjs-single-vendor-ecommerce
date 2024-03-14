"use client";

import image from "../images/login.jpg";
import styles from "./page.module.css";
import useAutoLogin from "../hooks/useAutoLogin";
import Loader from "../components/Loader/loader";
import ParticlesBackground from "../components/LandingPageParticalAnimation/ParticlesBackground";
import Navbar from "../components/navbar/navbar";
import HomeText from "./HomeText/page";
import ProductCard from "../components/ProductCard/page";
import { GetAllProduct } from "../ApiRequest/internalapi";
import { useEffect, useState } from "react";
export default function Home() {
  const loading = useAutoLogin();
  const [pages, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const data = {
        page: pages,
      };
      const response = await GetAllProduct(data);
      if (response.status === 200) {
        setProducts(response.data.Products);
      }
    })();

    setProducts([]);
  }, []);

  return loading ? (
    <Loader text="homepage" />
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
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </>
  );
}
