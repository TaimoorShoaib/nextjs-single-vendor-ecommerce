"use client"

import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import style from "./detailProduct.module.css";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

// Import ReviewCard component if available
// import ReviewCard from "./ReviewCard.js";
import Loader from "../../../components/Loader/loader.jsx";
import { GetProduct } from "../../../ApiRequest/internalapi";
import MetaData from "../../../components/MetaData/metaData.js";
// import { addItemsToCart } from "../../actions/cartAction.js";
import Navbar from "../../../components/navbar/navbar";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Protected from "../../../components/protected/protected"
const ProductDetails = ({ params }) => {
  const loading1 = useAutoLogin();
  const dispatch = useDispatch();
  const id = params.id;
  console.log(id);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownsProduct, setOwnsProduct] = useState(false);

  
  const  isAuth  = useSelector(
    (state) => state.user.auth
  );
  useEffect(() => {
    (async function getBlogDetail() {
      console.log(id);
      const response = await GetProduct(id);
      console.log(response.data);
      if (response.status === 200) {
        setProduct(response.data.Product);
        setLoading(false);
      }
    })();
  }, []);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: typeof window !== 'undefined' && window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    // dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };

  if (loading1) {
    return <Loader />;
  }
  
  return (
    <Protected isAuth={isAuth}>
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <Navbar />
          <div className={style.ProductDetails}>
        
            <div className={style.ProductImageContainer}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className={style.CarouselImage}
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className={style.ProductInfoContainer}>
              <div className={style.ProductTitle}>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <hr /> {/* Horizontal line */}
              <div className={style.ProductRating}>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <hr /> {/* Horizontal line */}
              <div className={style.ProductPrice}>
                <h1>{`Price: ${product.price}Rs`}</h1>
              </div>
              <hr /> {/* Horizontal line */}
              <div className={style.ProductQuantity}>
  <div className={style.QuantityControl}>
    <button className={`${style.QuantityButton} ${style.DecreaseButton}`} onClick={decreaseQuantity}>-</button>
    <input
      readOnly
      type="number"
      value={quantity}
      className={style.QuantityInput} // Add class for styling
    />
    <button className={`${style.QuantityButton} ${style.IncreaseButton}`} onClick={increaseQuantity}>+</button>
  </div>
</div>
<button
  onClick={addToCartHandler}
  disabled={product.Stock < 1 ? true : false}
  className={style.AddToCartButton}
>
  Add to Cart
</button>
              <hr /> {/* Horizontal line */}
              <div className={style.ProductStatus}>
                <p>
                  Status: <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <hr /> {/* Horizontal line */}
              <div className={style.ProductDescription}>
                <h3>Description:</h3>
                <p>{product.description}</p>
              </div>
              <hr /> {/* Horizontal line */}
              <button className={style.SubmitReviewButton}>Submit Review</button>
            </div>
          </div>
          <h3 className={style.reviewsHeading}>REVIEWS</h3>

          <dialog aria-labelledby="simple-dialog-title">
            <dialog>Submit Review</dialog>
            <dialog className={style.submitDialog}>
              <ReactStars size="large" />

              <textarea
                className={style.submitDialogTextArea}
                cols="30"
                rows="5"
                value=""
              ></textarea>
            </dialog>
            <dialog>
              <button color="secondary">Cancel</button>
              <button color="primary">Submit</button>
            </dialog>
          </dialog>

          {product.reviews && product.reviews[0] ? (
            <div className={style.reviews}>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className={style.noReviews}>No Reviews Yet</p>
          )}
        </>
      )}
    </>
    </Protected>
  );
};

export default ProductDetails;
