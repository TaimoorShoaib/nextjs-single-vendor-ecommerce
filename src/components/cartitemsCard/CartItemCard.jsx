"use client"
import React from "react";
import style from  "./CartItemCard.module.css";
import Link from "next/link";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className={style.CartItemCard}>
      <img className={style.CartItemCardimg} src={item.image} alt="ssa" />
      <div className={style.CartItemCarddiv}>
        <Link className={style.CartItemCarddiva} href={`/product/${item.product}`}>{item.name}</Link>
        <span className={style.CartItemCarddivspan}>{`Price: ₹${item.price}`}</span>
       
        <p className={style.CartItemCarddivp} onClick={() => deleteCartItems(item.product)}>Remove</p>
     
      </div>
    
    </div>
    
  );
}; 

export default CartItemCard;