import ReactStars from "react-rating-stars-component";
import React from "react";
import style from "./review.module.css"
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className={style.reviewCard}>
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className={style.reviewCardComment}>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
