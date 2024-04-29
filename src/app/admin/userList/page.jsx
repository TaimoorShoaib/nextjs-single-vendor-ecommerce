"use client"

import style from "./userList.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../components/adminStuff/dummydata/dummydata";
import Link from "next/link";
import { useEffect, useState } from "react";
import {GetAllUsersAdmin,deleteUserAdmin} from  "../../../ApiRequest/internalapi"
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/loader";
import useAutoLogin from "../../../hooks/useAutoLogin";
import ProtectedAdmin from "../../../components/protectedAdmin/protectedAdmin"
import Topbar from "../../../components/adminStuff/topbar/Topbar";
import Footer from "../../../components/footer/footer";
export default function UserList() {
  const loading1 = useAutoLogin();
 const [loading ,setLoading] = useState(false)
  const [data, setData] = useState(userRows);
const ownerId =  useSelector(
  (state) => state.user._id
);
const isAdmin =  useSelector(
  (state) => state.user.isAdmin
);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllUsersAdmin();
        if (response.status === 200) {
          // Assuming each product has an '_id' property
          const usersWithId = response.data.Users.map(user => ({
            ...user,
            id: user._id
          }));
          setData(usersWithId);
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
      userId: id,
      ownerId: ownerId,
    };
    setLoading(true);
    try {
      const response = await deleteUserAdmin(requestData);
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
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.userListUser}>
            
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    
    {
      field: "isVerified",
      headerName: "IsVerified",
      width: 120,
    },{
      field: "isAdmin",
      headerName: "IsAdmin",
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
            <Link href={"/admin/user/" + params.row.id}>
              <button className={style.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={style.userListDelete}
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
    <ProtectedAdmin isAdmin={isAdmin}>
      <Topbar/>
    <div className={style.userList}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </ProtectedAdmin>
  );

}