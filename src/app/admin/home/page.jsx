"use client"
import useAutoLogin from "../../../hooks/useAutoLogin";
import ProtectedAdmin from "../../../components/protectedAdmin/protectedAdmin"
import Topbar from "../../../components/adminStuff/topbar/Topbar"
import Loader from "../../../components/Loader/loader";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/adminStuff/sideBar/Sidebar";
import style from "./adminHome.module.css";

import { Typography } from "@mui/material";
import Link from "next/link";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto'; // Import Chart.js
import { useSelector} from "react-redux";
import MetaData from "../../../components/MetaData/metaData.js";
import { GetAllProductAdmin } from "../../../ApiRequest/internalapi.js";
import { getAllOrder } from "../../../ApiRequest/internalapi.js";
import { GetAllUsersAdmin } from "../../../ApiRequest/internalapi.js";
import Footer from "../../../components/footer/footer";
Chart.register({
  id: 'category',
  parse: () => {}, // This is a dummy parse function, as it's required by Chart.js 3.x
  isCategory: true, // This marks the scale as a category scale
  determineDataLimits: () => {}, // This is a dummy function as well
  buildTicks: () => {}, // Another dummy function
  generateLabels: () => {} // Yet another dummy function
});
const Dashboard = () => {
      const loading1 = useAutoLogin()
       const [loading,setLoading]=useState(false)

     const [products,setProducts] = useState([])
     const [orders,setOrders] = useState([])
     const [users,setUsers] = useState([])
     const ownerId =  useSelector(
      (state) => state.user._id
    );
    const isAdmin =  useSelector(
      (state) => state.user.isAdmin
    );
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // set loading to true before API calls
        const response1 = await getAllOrder(ownerId);
        if (response1.status === 200) setOrders(response1.data.Order);
  
        const response2 = await GetAllProductAdmin();
        if (response2.status === 200) setProducts(response2.data.Products);
  
        const response3 = await GetAllUsersAdmin();
        if (response3.status === 200) setUsers(response3.data.Users);
  
        setLoading(false); // set loading to false after fetching data
      };
  
      fetchData();
    }, [ownerId]); // fetch data when ownerId changes

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

 

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
      options: {
        scales: {
          x: {
            type: 'category', // Ensure the x-axis scale type is 'category'
            labels: ['Initial Amount', 'Amount Earned'],
          },
          y: {
            beginAtZero: true // Optionally, ensure y-axis starts from zero
          }
        }
      }
    };
    
    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    };
    if(loading||loading1){
       return <Loader/>
    }
  return (
    <div className="dashboard">
      <ProtectedAdmin isAdmin={isAdmin} >
      <MetaData title="Dashboard - Admin Panel" />
    <Topbar/>
      <div className={style.dashboardContainer}>
        <Typography component="h1">Dashboard</Typography>

        <div className={style.dashboardSummary}>
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className={style.dashboardSummaryBox2}>
            <Link href="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link href="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link href="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className={style.lineChart}>
        <Line data={lineState} />
        </div>

        <div className={style.doughnutChart}>
        <Doughnut data={doughnutState} />
        </div>
      </div>
      <Footer/>
      </ProtectedAdmin>
    </div>
   
  );
};

export default Dashboard;