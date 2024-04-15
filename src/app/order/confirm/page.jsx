"use client"
import React from "react";
import CheckoutSteps from "../checkoutSteps/page";
import { useSelector } from "react-redux";
import MetaData from "../../../components/MetaData/metaData";
import style from "./confirm.module.css";
import Link from "next/link";
import { Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/Loader/loader.jsx";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Protected from "../../../components/protected/protected";
import { CreateOrder } from "../../../ApiRequest/internalapi";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const ConfirmOrder = () => {
  const loading1 = useAutoLogin();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const isAuth = useSelector((state) => state.user.auth);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  // Check if shippingInfo is defined before accessing its properties

  // Calculate subtotal, tax, and total price
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingCharges = 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = async () => {
    try {
      // Check if shippingInfo is defined before using it
      if (shippingInfo) {
        const shippingInfoFormatted = {
          ...shippingInfo,
          pinCode: parseInt(shippingInfo.pinCode), // Convert pinCode to number
          phoneNo: parsePhoneNumberFromString(shippingInfo.phoneNo, shippingInfo.country).formatInternational()
        };
        const data = {
          itemsPrice: subtotal,
          shippingPrice: shippingCharges,
          taxPrice: tax,
          totalPrice,
          shippingInfo: shippingInfoFormatted,
          orderItems: cartItems,
          user: user._id
        };
        const data1 = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
        const response = await CreateOrder(data);
        if (response.status === 201) {
          router.push("/");
          sessionStorage.setItem("orderInfo", JSON.stringify(data1));
        } else {
          console.error("Failed to create order:", response.statusText);
        }
      } else {
        console.error("Shipping information is missing.");
      }
    } catch (error) {
      console.error("Error while creating order:", error);
    }
  };
  const address = shippingInfo
    ? `${shippingInfo.address || ''}, ${shippingInfo.city || ''}, ${shippingInfo.state || ''}, ${shippingInfo.pinCode || ''}, ${shippingInfo.country || ''}`
    : '';
  if (loading1) {
    return <Loader />;
  }
  
  
  return (
    <>
        
    <Protected  isAuth={isAuth} >
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className={style.confirmOrderPage}>
        <div>
          <div className={style.confirmshippingArea}>
            <Typography>Shipping Info</Typography>
            <div className={style.confirmshippingAreaBox}>
              <div>
                <p>Name:</p>
                <span>{user.username}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className={style.confirmCartItems}>
            <Typography>Your Cart Items:</Typography>
            <div className={style.confirmCartItemsContainer}>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link href={`/detailProduct/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs{item.price} ={" "}
                      <b>Rs{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className={style.orderSummary}>
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs{tax}</span>
              </div>
            </div>

            <div className={style.orderSummaryTotal}>
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Place Order</button>
          </div>
        </div>
      </div>
    </Protected>
    
   </>
  );
};

export default ConfirmOrder;