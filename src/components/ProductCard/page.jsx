"use client";
import ReactStars from "react-rating-stars-component";

import styles from "./productcard.module.css";
export default function ProductCard() {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 3.5,
    isHalf: true,
  };
  return (
    <div>
      <a className={styles.productCard} href="/">
        <img src="https://wallup.net/wp-content/uploads/2017/11/23/515948-cityscape-New_York_City-sunset.jpg" alt={"product.name"} className={styles.productCardimg}   />
        <p  className={styles.productCardp} >{"product.name"}</p>
        <div className={styles.productCarddiv}>
          <ReactStars {...options} />
          <span className={styles.productCardSpan}> (7 reviews)</span>
        </div>
        <span className={styles.productCardPrice}>{`Rs 3500`}</span>
      </a>

    </div>
  );
}
