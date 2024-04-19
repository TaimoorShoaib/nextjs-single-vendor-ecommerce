"use client";

import styles from "./page.module.css";
import useAutoLogin from "../hooks/useAutoLogin";
import Loader from "../components/Loader/loader";
import ParticlesBackground from "../components/LandingPageParticalAnimation/ParticlesBackground";
import Navbar from "../components/navbar/navbar";
import ProductCard from "../components/ProductCard/page";
import { GetAllProduct } from "../ApiRequest/internalapi";
import { useEffect, useState } from "react";
import FloatFooter from "../components/footer/footer";
import Footer from "../components/footer/footer";
export default function Home() {
  const loading = useAutoLogin();
  const [pages, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState([]);
  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const data = {
        page: pages,
      };
      const response = await GetAllProduct(data);
      if (response.status === 200) {
        setProducts(response.data.Products);
        setProductsLoading(response.data.Products);
      }
    })();

    setProducts([]);
  }, []);

  return loading && productsLoading.length === 0 ? (
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
      <Footer />
    </>
  );
}
