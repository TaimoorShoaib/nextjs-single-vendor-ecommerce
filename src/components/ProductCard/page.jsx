import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import styles from "./productcard.module.css";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <div>
      <Link
        className={styles.productCard}
        href={`/detailProduct/${product._id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          className={styles.productImage}
          src={hovered ? product.images[1].url : product.images[0].url}
          alt={product.name} // Don't forget to add alt text for accessibility
        />
        <p className={styles.productCardp}>{product.name}</p>
        <div className={styles.productCarddiv}>
          <ReactStars {...options} />
          <span className={styles.productCardSpan}>
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span className={styles.productCardPrice}>{`Rs${product.price}`}</span>
      </Link>
    </div>
  );
}
