"use client"

import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
import Link from "next/link";
  import style from "./user.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { updateUserAdmin } from "../../../../ApiRequest/internalapi";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader/loader";
import Protected from "../../../../components/protected/protected"
  export default function User() {
    const loading1 = useAutoLogin();
    const router = useRouter()
    const dispatch = useDispatch();
    const params = useParams()
    const id = params.id
    //const alert = useAlert();
  
    
    const user =  useSelector(
      (state) => state.user
    );
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [isVerified, setIsVerified] = useState();
    const [isAdmin, setIsAdmin] = useState();
  
    useEffect(() => {
      setIsVerified(user.isVerified);
      setIsAdmin(user.isAdmin);
      setEmail(user?.email)
      setUsername(user?.username)
    }, [user]);
  
    const updateuserSubmitHandler = (e) => {
      e.preventDefault();
      const data ={
        username:username,
        email:email,
        isVerified:isVerified,
        isAdmin:isAdmin,
        userId:id,
        ownerId:user._id,
       }
      
     
      updateUserAdmin(data)
      //router.push("/admin/home")
    };
 
    const handleVerifiedChange = (e) => {
      setIsVerified(e.target.value === 'true');
    };
  
    const handleAdminChange = (e) => {
      setIsAdmin(e.target.value === 'true');
    };
    console.log(username)

    return (
      <>
      { loading1 ? <Loader/>:<Protected isAuth={user.auth}>
      <div className={style.user}>
        <div className={style.userTitleContainer}>
          <h1 className={style.userTitle}>Edit User</h1>
          <Link href="/newUser">
            <button className={style.userAddButton}>Create</button>
          </Link>
        </div>
        <div className={style.userContainer}>
          <div className={style.userShow}>
            <div className={style.userShowTop}>
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className={style.userShowImg}
              />
              <div className={style.userShowTopTitle}>
                <span className={style.userShowUsername}>{user.username}</span>
              
              </div>
            </div>
            <div className={style.userShowBottom}>
              <span className={style.userShowTitle}>Account Details</span>
              <div className={style.userShowInfo}>
                <PermIdentity className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>{user.username}</span>
              </div>
            
              <span className={style.userShowTitle}>Contact Details</span>
             
              <div className={style.userShowInfo}>
                <MailOutline className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>{user.email}</span>
              </div>
             
            </div>
          </div>
          <div className={style.userUpdate}>
            <span className={style.userUpdateTitle}>Edit</span>
            <form className={style.userUpdateForm}>
              <div className={style.userUpdateLeft}>
                <div className={style.userUpdateItem}>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className={style.userUpdateInput}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div className={style.userUpdateItem}>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user.email}
                    className={style.userUpdateInput}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={style.userUpdateItem}>
        <label>isVerified</label>
        <select
          className={style.userUpdateInput}
          value={isVerified.toString()}
          onChange={handleVerifiedChange}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div className={style.userUpdateItem}>
        <label>isAdmin</label>
        <select
          className={style.userUpdateInput}
          value={isAdmin.toString()}
          onChange={handleAdminChange}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
              </div>
              <div className={style.userUpdateRight}>
                <div className={style.userUpdateUpload}>
                  <img
                    className={style.userUpdateImg}
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className={style.userUpdateIcon} />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className={style.userUpdateButton} onClick={updateuserSubmitHandler}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Protected>}
      </>
    );
  }