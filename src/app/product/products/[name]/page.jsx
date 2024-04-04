"use client"

import { useState,useEffect } from "react";
import style from "./products.module.css"
import { useSelector, useDispatch } from "react-redux";
import { GetAllProduct } from "../../../../ApiRequest/internalapi";
import Pagination from "react-js-pagination";
import MetaData from "../../../../components/MetaData/metaData"
import ProductCard from "../../../../components/ProductCard/page"
import Loader from "../../../../components/Loader/loader";
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import Protected from "../../../../components/protected/protected"
import useAutoLogin from "../../../../hooks/useAutoLogin";

const  Products  =  ({ params }) => { 
  const loading1 = useAutoLogin();

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsCount,setProductsCount] = useState(0)
  const [resultPerPage,setResultPerPage] = useState(0)
  const [count,setCount] = useState(0)
  
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  const { name } = params;
  /* 
// Use useParams to get the keyword parameter from the URL



*/
const setCurrentPageNo = (e) => {
  setPage(e);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await GetAllProduct({ name, page });
      if (response.status === 200) {
        setProducts(response.data.Products);
        setProductsCount(response.data.productsCount)
        setResultPerPage(response.data.resultPerPage)
        setCount(response.data.filteredProductsCount)
      }
    } catch (error) {
      console.log(error);
      // Handle error here, e.g., set error state
    }
  };

  fetchData();

}, [name, page]);
const priceHandler = (event, newPrice) => {
  setPrice(newPrice);
};
console.log(count+"ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
const  isAuth  = useSelector(
  (state) => state.user.auth
);
if (loading1) {
  return <Loader />;
}
  return (
      
<Protected isAuth={isAuth}>
          <>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className={style.productsHeading}>Products</h2>
            <div className={style.products}>
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className={style.filterBox}>
            <div>
<label htmlFor="price">Price:</label>
<input
  type="range"
  id="price"
  name="price"
  value={price[1]}
  min="0"
  max="25000"
  onChange={(e) => setPrice([price[0], parseInt(e.target.value)])}
/>
<span>{price[1]}</span>
</div>
              <p>Categories</p>
              <ul className={style.categoryBox}>
                {categories.map((category) => (
                  <li
                    className={style.categorylink}
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <p component="legend">Ratings Above</p>
                <LinearScaleIcon
value={ratings}
onChange={(e, newRating) => {
  setRatings(newRating);
}}
aria-labelledby="continuous-slider"
min={0}
max={5}
/>
              </fieldset>
            </div>
            {resultPerPage < count && (
              <div className={style.paginationBox}>
                <Pagination
                  activePage={page}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass={style.pageitem}
                  linkClass={style.pagelink}
                  activeClass={style.pageItemActive}
                  activeLinkClass={style.pageLinkActive}
                />
              </div>
            )}
          </>
          </Protected>
    
    );
}

export default Products