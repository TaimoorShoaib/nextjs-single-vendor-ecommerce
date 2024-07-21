// components/CategorySection/CategorySection.js
"use client";
import styles from "./CategorySection.module.css";
import { useRouter } from 'next/navigation';

const CategorySection = () => {
  const router = useRouter()
  const categories = [
    { name: "Laptop", image: "https://wallup.net/wp-content/uploads/2017/11/23/515948-cityscape-New_York_City-sunset.jpg" },
    { name: "Footwear", image: "https://wallup.net/wp-content/uploads/2017/11/23/515948-cityscape-New_York_City-sunset.jpg" },
    { name: "Camera", image: "https://wallup.net/wp-content/uploads/2017/11/23/515948-cityscape-New_York_City-sunset.jpg" },
    
  ];
  const handleCategoryClick = (categoryName) => {
    router.push(`/product/products?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };
  return (
    <div className={styles.categorySection}>
      <h2 className={styles.heading}>Categories</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category.name}
            className={styles.categoryCard}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} className={styles.categoryImage} />
            <div className={styles.overlay}>
              <h3 className={styles.categoryName}>{category.name.toUpperCase()}</h3>
              <button className={styles.categoryButton}>{category.name.toUpperCase()}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;