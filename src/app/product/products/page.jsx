"use client"
import { useState,useEffect } from "react";
import style from "./[name]/products.module.css"
import { useSelector, useDispatch } from "react-redux";
import { GetAllProduct } from "../../../ApiRequest/internalapi";
import Pagination from "react-js-pagination";
import MetaData from "../../../components/MetaData/metaData"
import ProductCard from "../../../components/ProductCard/page"
import Loader from "../../../components/Loader/loader";
import Protected from "../../../components/protected/protected"
import useAutoLogin from "../../../hooks/useAutoLogin";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import Slider from "@mui/material/Slider";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


const  Products  =  () => { 

  const loading1 = useAutoLogin();

  const params = useParams()
 const router = useRouter()
  const [page, setPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState([]);
    const [productsCount,setProductsCount] = useState(0)
    const [resultPerPage,setResultPerPage] = useState(0)
    const [count,setCount] = useState(0)
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
      const [maxPrice ,setMaxPrice] = useState(25000)
      const [minPrice ,setMinPrice] = useState(0)
    const categories = [
      "All",
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
    const { name } = params;
   // const categoryUrlLink = searchParams.get('category');


    
  
    //const category1 = searchParams.get('category')
//setCategory(category1)

    /* 
  // Use useParams to get the keyword parameter from the URL
 
 useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: category.toLowerCase(),
      }));
    }
  }, []);
 
 */
  

  const setCurrentPageNo = (e) => {
    setPage(e);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        //setLoading(true)   
        const response = await GetAllProduct({ name, page , filters });
        if (response.status === 200) {
          setProducts(response.data.Products);
          setProductsLoading(response.data.Products)
          //if(category !== null){
          //  const filteredProducts = response.data.Products.filter(product => product.category === category);
          //  setProducts(filteredProducts);
  
         // }
          setProductsCount(response.data.productsCount)
          setResultPerPage(response.data.resultPerPage)
          setCount(response.data.filteredProductsCount)
          
        }
      } catch (error) {
      //  setLoading(true)
        console.log("Internal server error");
        // Handle error here, e.g., set error state
      }
      //finally{
        //setLoading(false)
      //}
    };

    fetchData();

  }, [name, page , filters]);
  const setPriceHandler = () => {
    setFilters({ ...filters, price: { gte: minPrice, lte: maxPrice } });
  };
 // const priceHandler = (event, newPrice) => {
  //  setPrice(newPrice);
  //  setFilters({ ...filters, price: { gte: newPrice[0], lte: newPrice[1] } });
//  };
  const ratingHandler = ( event,newRating) => {
    setRatings(newRating);
    setFilters({ ...filters, ratings: { gte: newRating} });
  };

  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === "All") {
      const newFilters = { ...filters };
      delete newFilters.category;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, category: selectedCategory.toLowerCase() });
    }
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

    return (
      <>
       {loading1 || loading ||  productsLoading.length === 0 ? <Loader/> : <>
       <Protected isAuth={isAuth}>
          <Navbar/>
            <>
              <MetaData title="PRODUCTS -- ECOMMERCE" />
              <h2 className={style.productsHeading}>Products</h2>
              <div className={style.products}>
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  {products.length ===0 && <div className={style.emptyCart}>
            <RemoveShoppingCartIcon />
            <h3>No Product Found</h3>
            
          </div> }
              </div>
              <div className={style.filterBox}>
              <div className={style.priceFilterContainer}>
              
              <label htmlFor="price">Price:</label>
           
  <input
    type="number"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    placeholder="Max Price"
    className={style.priceInput}
  />
  <input
    type="number"
    value={minPrice}
    onChange={(e) => setMinPrice(Number(e.target.value))}
    placeholder="Min Price"
    className={style.priceInput}
  />
  <button onClick={setPriceHandler} className={style.priceButton}>
    Submit
  </button>
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
              </Protected>
        </>
        
      
        }
            </>
      );
}

export default Products