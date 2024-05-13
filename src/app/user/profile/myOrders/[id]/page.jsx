"use client"
import React, { Fragment, useEffect, useState } from "react";
import style from "./myOrderDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../../../components/MetaData/metaData";
import Link from "next/link";
import { Typography } from "@mui/material";
//import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../../../../../components/Loader/loader";
import { useParams } from "next/navigation";
//import { useAlert } from "react-alert";
import useAutoLogin from "../../../../../hooks/useAutoLogin";
import Protected from "../../../../../components/protected/protected"
import { getLogInUserOrderDetail } from "../../../../../ApiRequest/internalapi";
import Navbar from "../../../../../components/navbar/navbar";
import Footer from "../../../../../components/footer/footer";
const OrderDetails = () => {
  const loading = useAutoLogin();

  const [order , setOrder] = useState({}); // Initialize with an empty object
  const params = useParams()
  const isAuth = useSelector((state) => state.user.auth);
const id = params.id
    useEffect(() => {
    (async function getOrderDetail() {
      const response = await getLogInUserOrderDetail(id);
      if (response.status === 200) {
        setOrder(response.data.Order);
      }
    })();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Protected isAuth={isAuth}>
          <MetaData title="Order Details" />
          <Navbar/>
          <div className={style.orderDetailsPage}>
            <div className={style.orderDetailsContainer}>
              <Typography className={style.orderDetailsContainerh1} component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className={style.orderDetailsContainerBox}>
                <div  className={style.orderDetailsContainerBoxdiv}>
                  <p className={style.orderDetailsContainerBoxdivp}>Name:</p>
                  <span  className={style.orderDetailsContainerBoxdivspan}>{order.user && order.user.username}</span>
                </div>
                <div  className={style.orderDetailsContainerBoxdiv}>
                  <p className={style.orderDetailsContainerBoxdivp}>Phone:</p>
                  <span  className={style.orderDetailsContainerBoxdivspan}>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div  className={style.orderDetailsContainerBoxdiv}>
                  <p className={style.orderDetailsContainerBoxdivp}>Address:</p>
                  <span  className={style.orderDetailsContainerBoxdivspan}>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className={style.orderDetailsContainerBox}>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className={style.orderDetailsContainerBox}>
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className={style.orderDetailsCartItems}>
              <Typography>Order Items:</Typography>
              <div className={style.orderDetailsCartItemsContainer}>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img className={style.orderDetailsCartItemsContainerImg} src={item.image} alt="Product" />
                      <Link href={`/detailProduct/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Footer/>
        </Protected>
      )}
    </Fragment>
  );
};

export default OrderDetails;