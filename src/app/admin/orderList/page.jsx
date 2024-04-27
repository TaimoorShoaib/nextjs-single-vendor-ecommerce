"use client"

import style from "./orderList.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../components/adminStuff/dummydata/dummydata";
import Link from "next/link";
import { useEffect, useState } from "react";
import {getAllOrder,deleteOrder} from  "../../../ApiRequest/internalapi"
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/loader";
import useAutoLogin from "../../../hooks/useAutoLogin";
export default function UserList() {
  const loading1 = useAutoLogin();
 const [loading ,setLoading] = useState(false)
 const [data, setData] = useState([]);
 const ownerId =  useSelector(
  (state) => state.user._id
);
console.log(data)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getAllOrder(ownerId);
      if (response.status === 200) {
        // Assuming the response contains an array of orders
        const ordersWithId = response.data.Order.map((order, index) => ({
          ...order,
          id: index + 1, // Assuming index is not suitable as an id
        }));
        setData(ordersWithId);
      } else {
        console.log("Failed to fetch orders:", response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error here, e.g., set error state
    }
  };

  fetchData(); // Call fetchData function immediately

  // Add ownerId to the dependency array to trigger useEffect on ownerId change
}, [ownerId]); // Add ownerId to the dependency array
   
  const handleDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id); // Declare data before usage
    setData(newData);
    const requestData = {
      orderId: id,
      userId: ownerId,
    };
    setLoading(true);
    try {
      const response = await deleteOrder(requestData);
      if (response.status === 200) {
        setLoading(false);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error here, e.g., set error state
    }
  };
  
  const columns = [
    { field: "id", headerName: "Number", width: 90 },
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.userListUser}>
            
            {params.row.user.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={style.userListUser}>
            
            {params.row.user.email}
          </div>
        );
      },
    },
    {
      field: "itemsPrice",
      headerName: "ItemsPrice",
      width: 120,
    },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      width: 120,
    },
    {
      field: "orderStatus",
      headerName: "OrderStatus",
      width: 120,
    },
    ,{
      field: "createdAt",
      headerName: "JoinedAt",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/admin/order/" + params.row._id}>
              <button className={style.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={style.userListDelete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  if(loading1 || loading){
    return <Loader/>
 }

  return (
    
    <div className={style.userList}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );

}