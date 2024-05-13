"use client"
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../../../components/MetaData/metaData";
import Loader from "../../../../components/Loader/loader";
import Link from "next/link";
import style from "./myProfile.module.css";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import Protected from "../../../../components/protected/protected";
import Navbar from "../../../../components/navbar/navbar";
import Footer from "../../../../components/footer/footer";
const Profile = () => {
    const loading1 = useAutoLogin();
       const user = useSelector((state) => state.user);
 
    const isAuth = user.auth;
 //<img src={user.avatar.url} alt={user.name} />

  return (
    <Fragment>
      {loading1 ? (
        <Loader />
      ) : (
        <Protected isAuth={isAuth}>
          <MetaData title={`${user.name}'s Profile`} />
          <Navbar/>
          <div className={style.profileContainer}>
            <div>
              <h1>My Profile</h1>
              <Link href="/user/profile/updateProfile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Username</h4>
                <p>{user.username}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              

              <div>
                <Link href="/user/profile/myOrders">My Orders</Link>
                <Link href="/user/profile/updatePassword">Change Password</Link>
              </div>
            </div>
          </div>
          <Footer/>
        </Protected>
      )}
    </Fragment>
  );
};

export default Profile;