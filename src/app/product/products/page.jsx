"use client"
import { useState,useEffect } from "react";
import style from "./[name]/products.module.css"
import { useSelector, useDispatch } from "react-redux";
import { GetAllProduct } from "../../../ApiRequest/internalapi";
import Pagination from "react-js-pagination";
import MetaData from "../../../components/MetaData/metaData"
import ProductCard from "../../../components/ProductCard/productCard"
import Loader from "../../../components/Loader/loader";
import Protected from "../../../components/protected/protected"
import useAutoLogin from "../../../hooks/useAutoLogin";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import Slider from "@mui/material/Slider";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";


const  Products  =  () => { 

  const loading1 = useAutoLogin();

  const params = useParams()
 const router = useRouter()
  const [page, setPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [productsCount,setProductsCount] = useState(0)
    const [resultPerPage,setResultPerPage] = useState(0)
    const [count,setCount] = useState(0)
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

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
    //const category1 = searchParams.get('category')
//setCategory(category1)

    /* 
  // Use useParams to get the keyword parameter from the URL
 
 
 
 */
 

  const setCurrentPageNo = (e) => {
    setPage(e);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProduct({ name, page , filters });
        if (response.status === 200) {
          setProducts(response.data.Products);
          //if(category !== null){
          //  const filteredProducts = response.data.Products.filter(product => product.category === category);
          //  setProducts(filteredProducts);
  
         // }
          setProductsCount(response.data.productsCount)
          setResultPerPage(response.data.resultPerPage)
          setCount(response.data.filteredProductsCount)
        }
      } catch (error) {
        console.log("Internal server error");
        // Handle error here, e.g., set error state
      }
    };

    fetchData();

  }, [name, page , filters]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    setFilters({ ...filters, price: { gte: newPrice[0], lte: newPrice[1] } });
  };
  const ratingHandler = ( event,newRating) => {
    setRatings(newRating);
    setFilters({ ...filters, ratings: { gte: newRating} });
  };

  const handleCategoryClick = (selectedCategory) => {

    setFilters({ ...filters, category: selectedCategory.toLowerCase() });
  };
 const  isAuth  = useSelector(
  (state) => state.user.auth
);
useEffect(() => {
  if (products.length === 0) {
    // Set loading to true initially
    setLoading(true);

    // Set loading to false after 3000 milliseconds (3 seconds)
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts or when products change
    return () => clearTimeout(timerId);
  }
}, []);
if(loading1){
  return  <Loader text={Products}/>
}
    return (
      <Protected isAuth={isAuth}>
       {loading1 && loading ? <Loader/> : <>
          <Navbar/>
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
              <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
</div>
                <p>Categories</p>
                <ul className={style.categoryBox}>
            {categories.map((cat) => (
              <li
                className={style.categorylink}
                key={cat}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
                <fieldset>
                  <p component="legend">Ratings Above</p>
                  <Slider
                value={ratings}
                onChange={ratingHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
                </fieldset>
              </div>
              {resultPerPage < count && (
                <div className={style.paginationBox}>
                  <Pagination
                  className={style.pagination}
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
            <Footer/>
        </>}
            </Protected>
      );
}

export default Products