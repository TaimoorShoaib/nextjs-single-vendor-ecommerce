"use client"
import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../../../components/MetaData/metaData"
import Link from "next/link";
import { Typography } from "@mui/material";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../components/Loader/loader";
//import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import style from  "./order.module.css";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/adminStuff/topbar/Topbar"
import Footer from "../../../../components/footer/footer"
import useAutoLogin from "../../../../hooks/useAutoLogin";
import ProtectedAdmin from "../../../../components/protectedAdmin/protectedAdmin"
import Topbar from "../../../../components/adminStuff/topbar/Topbar";

const ProcessOrder = () => {
  const loading1 = useAutoLogin();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const ownerId =  useSelector(
    (state) => state.user._id
  );
  const isAdmin =  useSelector(
    (state) => state.user.isAdmin
  );
  const params= useParams()
  const id = params.id
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("orderStatus", status);
    myForm.set("userId",ownerId );
    myForm.set("orderId", id);
    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  //const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
     // alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
     // alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
//alert.success("Order Updated Successfully");
      dispatch({ type: "UPDATE_ORDER_RESET" });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch,error, id, isUpdated, updateError]);
  if (loading1) {
    return <Loader />;
  }
  return (
    <ProtectedAdmin isAdmin={isAdmin}>
     <Topbar/>
      <MetaData title="Process Order" />
      <div className={style.dashboard}>

        <div className={style.newProductContainer}>
          {loading ? (
            <Loader />
          ) : (
            <div
              className={style.confirmOrderPage}
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className={style.confirmshippingArea}>
                  <Typography>Shipping Info</Typography>
                  <div className={style.orderDetailsContainerBox}>
                    <div>
                      <p>Name:</p>
                      <span>{ order.user.username ? order.user.username : "Deleted user" }</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <div className={style.orderDetailsContainerBox}>
                  

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className={style.orderDetailsContainerBox}>
                    <div>
                    <p className={order.orderStatus === "Delivered" ? style.greenColor : style.redColor}>
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.confirmCartItems}>
                  <Typography>Your Cart Items:</Typography>
                  <div className={style.confirmCartItemsContainer}>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product"  width={200}/>
                          <Link href={`/product/${item.product}`}>
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className={style.updateOrderForm}
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                   
                      {order.orderStatus === "Shipped" && (
                        <>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        </>
                        
                      )}
                    </select>
                  </div> 

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </ProtectedAdmin>
  );
};

export default ProcessOrder;