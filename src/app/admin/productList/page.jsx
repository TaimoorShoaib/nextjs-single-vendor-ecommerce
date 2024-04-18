"use client"

import style from "./productList.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetAllProductAdmin ,deleteProductAdmin } from "../../../ApiRequest/internalapi";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Loader from "../../../components/Loader/loader";
import { useSelector } from "react-redux";
export default function ProductList() {
  const [data, setData] = useState([]);
  const loading1 = useAutoLogin();
  const [loading ,setLoading] = useState(false)
  const ownerId =  useSelector(
    (state) => state.user._id
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProductAdmin();
        if (response.status === 200) {
          // Assuming each product has an '_id' property
          const productsWithId = response.data.Products.map(product => ({
            ...product,
            id: product._id
          }));
          setData(productsWithId);
        }
      } catch (error) {
        console.log("Internal server error");
        // Handle error here, e.g., set error state
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id); // Declare data before usage
    setData(newData);
    const requestData = {
      id: id,
      userId:ownerId
    };
    setLoading(true);
    try {
      const response = await deleteProductAdmin(requestData);
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.productListItem}>
            <img className={style.productListImg} src={params.row.images[0].url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "Stock", headerName: "Stock", width: 200},
   
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "productSold",
      headerName: "Sold",
      width: 160
    },
    {
      field: "category",
      headerName: "Category",
      width: 160
    },
    {
      field: "numOfReviews",
      headerName: "NumberOfReviews",
      width: 160
    },
    {
      field: "ratings",
      headerName: "Rating",
      width: 160
    },
    {
      field: "user",
      headerName: "createdBy",
      width: 160
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 160
    },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/admin/product/" + params.row.id}>
              <button className={style.productListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={style.productListDelete}
              onClick={() => handleDelete(params.row.id)}
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
    <div className={style.productList}>
      {data.length > 0 ? (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );

}