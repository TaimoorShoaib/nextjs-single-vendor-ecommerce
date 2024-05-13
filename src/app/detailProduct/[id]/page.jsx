"use client"

import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import style from "./detailProduct.module.css";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Loader from "../../../components/Loader/loader.jsx";
import { GetProduct, PostReview } from "../../../ApiRequest/internalapi";
import MetaData from "../../../components/MetaData/metaData.js";
import Navbar from "../../../components/navbar/navbar";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Protected from "../../../components/protected/protected";
import ReviewCard from "../../../components/ReviewCard/review.jsx";
import { addItemsToCart } from "../../../actions/cartAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ProductDetails = ({ params }) => {
  const loading1 = useAutoLogin();
  const dispatch = useDispatch();
  const id = params.id;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownsProduct, setOwnsProduct] = useState(false);
  const isAuth = useSelector((state) => state.user.auth);

  useEffect(() => {
    (async function getBlogDetail() {
      const response = await GetProduct(id);
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
    size:
      typeof window !== "undefined" && window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
    dispatch(addItemsToCart(id, quantity));
    console.log("Item Added To Cart");
  };

  if (loading1) {
    return <Loader />;
  }
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = async () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    await PostReview(myForm);
    setOpen(false);
    window.location.reload(); // Reload the page after submitting a review
  };

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
                        key={item._id}
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
                <hr />
                <div className={style.ProductRating}>
                  <ReactStars {...options} />
                  <span>({product.numOfReviews} Reviews)</span>
                </div>
                <hr />
                <div className={style.ProductPrice}>
                  <h1>{`Price: ${product.price}Rs`}</h1>
                </div>
                <hr />
                <div className={style.ProductQuantity}>
                  <div className={style.QuantityControl}>
                    <button
                      className={`${style.QuantityButton} ${style.DecreaseButton}`}
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className={style.QuantityInput}
                    />
                    <button
                      className={`${style.QuantityButton} ${style.IncreaseButton}`}
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={addToCartHandler}
                  disabled={product.Stock < 1 ? true : false}
                  className={style.AddToCartButton}
                >
                  Add to Cart
                </button>
                <hr />
                <div className={style.ProductStatus}>
  <p>
    Status:{" "}
    <b className={product.Stock < 1 ? style.redColor : style.greenColor}>
      {product.Stock < 1 ? "Out of Stock" : "In Stock"}
    </b>
  </p>
</div>
                <hr />
                <div className={style.ProductDescription}>
                  <h3>Description:</h3>
                  <p>{product.description}</p>
                </div>
                <hr />
                <button
                  onClick={submitReviewToggle}
                  className={style.SubmitReviewButton}
                >
                  Submit Review
                </button>
              </div>
            </div>
            <h3 className={style.reviewsHeading}>REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <ReactStars
                  onChange={(newRating) => setRating(newRating)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className={style.reviews}>
                {product.reviews.map((review) => (
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