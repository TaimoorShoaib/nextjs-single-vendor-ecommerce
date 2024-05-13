"use client"
import React from "react";
import style from "./topbar.module.css";
import Link from "next/link";
import { resetUser } from "../../../lib/userSlice";
import { signout } from "../../../ApiRequest/internalapi";
import { useDispatch, useSelector } from "react-redux";
export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.auth;
  const isAdmin = user.isAdmin;

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };
  return (
    <div className={style.topbar}>
      <div className={style.topbarWrapper}>
        <div className={style.topLeft}>
          <Link href={"/"} className={style.logo}>
            lamaadmin
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/home"} className={style.page}>
            Home
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/orderList"} className={style.page}>
            Orders
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/userList"} className={style.page}>
            UserList
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/productList"} className={style.page}>
            ProductList
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/admin/newProduct"} className={style.page}>
            CreateProduct
          </Link>
        </div>
        <div className={style.topLeft}>
          <Link href={"/"} className={style.page}>
            Store
          </Link>
        </div>
        {isAuthenticated ? (
          <div>
            <button className={style.signOutButton} onClick={handleSignout}>
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <Link
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
              href="/user/login"
            >
              <button className={style.logInButton}>Log In</button>
            </Link>
            <Link
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
              href="/user/signup"
            >
              <button className={style.signUpButton}>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}