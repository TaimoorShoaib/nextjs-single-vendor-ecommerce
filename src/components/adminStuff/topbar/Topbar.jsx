import React from "react";
import style from "./topbar.module.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import Link from "next/link";
export default function Topbar() {
  return (
    <div className={style.topbar}>
      <div className={style.topbarWrapper}>
        <div className={style.topLeft}>
          <Link   href={"/admin/home"} className={style.logo}>lamaadmin</Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/orderList"} className={style.page}>orders</Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/userList"}  className={style.page}>UserList</Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/productList"}  className={style.page}>ProductList</Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/newProduct"}  className={style.page}>CreateProduct</Link>
        </div>
       
        <div className={style.topRight}>
          <div className={style.topbarIconContainer}>
            <NotificationsNone />
            <span className={style.topIconBadge}>2</span>
          </div>
          <div className={style.topbarIconContainer}>
            <Language />
            <span className={style.topIconBadge}>2</span>
          </div>
          <div className={style.topbarIconContainer}>
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className={style.topAvatar} />
        </div>
      </div>
    </div>
  );
}