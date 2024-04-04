"use client"
import React, { Fragment } from "react";
import style from "./cart.module.css";
import CartItemCard from "../../components/cartitemsCard/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Link from "next/link";
import useAutoLogin from "../../hooks/useAutoLogin";
import Protected from "../../components/protected/protected";
import Loader from "../../components/Loader/loader";
import MetaData from "../../components/MetaData/metaData";
import Navbar from "../../components/navbar/navbar";

const Cart = () => {
  const loading1 = useAutoLogin();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const isAuth = useSelector((state) => state.user.auth);
    
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(newQty)
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    console.log(newQty)
    if (newQty < 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    //history.push("/login?redirect=shipping");
    console.log("checkoutHandler")
  };

  if (loading1) {
    return <Loader />;
  }

  return (
    <Protected isAuth={isAuth}>
      <Fragment>
      <MetaData title={`Cart -- ECOMMERCE`} />
          <Navbar />
        {cartItems.length === 0 ? (
          <div className={style.emptyCart}>
            <RemoveShoppingCartIcon />
            <h3>No Product in Your Cart</h3>
            <Link className={style.emptyCarta} href="/products">View Products</Link>
          </div>
        ) : (
          <div className={style.cartPage}>
            <div className={style.cartHeader}>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems.map((item) => (
              <div className={style.cartContainer} key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className={style.cartInput}>
                  <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
                    -
                  </button>
                  <span className={style.quantityinput} >{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                    +
                  </button>
                </div>
                <p className={style.cartSubtotal}>{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}
            <div className={style.cartGrossProfit}>
              <div></div>
              <div className={style.cartGrossProfitBox}>
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
              </div>
              <div></div>
              <div className={style.checkOutBtn}>
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    </Protected>
  );
};

export default Cart;