"use client"
import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import style from "./orders.module.css";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader/loader"
import Link from "next/link";
import {Typography} from "@mui/material";
import MetaData from "../../../../components/MetaData/metaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { getLogInUserOrder } from "../../../../ApiRequest/internalapi";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import Protected from "../../../../components/protected/protected";
const MyOrders = () => {

  const loading = useAutoLogin();
  const isAuth = useSelector((state) => state.user.auth);


  const  user  = useSelector((state) => state.user);
  const [orders ,setOrders] = useState()
  const id = user._id
console.log(id+"ssssssssssssssssssss")
useEffect(() => {
  if (id) { 
    (async function getMyOrders() {
      const response = await getLogInUserOrder(id);
      if (response.status === 200) {
        setOrders(response.data.Orders);
      }
    })();
  }
}, [id]); 
const columns = [
  { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    flex: 0.5,
    cellClassName: (params) => {
      return params.value === "Delivered" ? "greenColor" : "redColor";
    },
  },
  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    minWidth: 150,
    flex: 0.3,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    minWidth: 270,
    flex: 0.5,
  },
  {
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <Link href={`/user/profile/myOrders/${params.row.id}`}>
          <LaunchIcon />
        </Link>
      );
    },
  },
];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    

  return (
    <Fragment>
      <MetaData title={`${user.username} - Orders`} />

      {loading ? (
        <Loader />
      ) : ( 
        <Protected isAuth={isAuth}>
        <div className={style.myOrdersPage}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className={style.myOrdersTable}
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.username}s Orders</Typography>
        </div>
        </Protected>
      )}
    </Fragment>
  );
};

export default MyOrders;