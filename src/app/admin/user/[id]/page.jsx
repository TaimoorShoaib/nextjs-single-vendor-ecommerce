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
  
  export default function User() {
    return (
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
                <span className={style.userShowUsername}>Anna Becker</span>
                <span className={style.userShowUserTitle}>Software Engineer</span>
              </div>
            </div>
            <div className={style.userShowBottom}>
              <span className={style.userShowTitle}>Account Details</span>
              <div className={style.userShowInfo}>
                <PermIdentity className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>annabeck99</span>
              </div>
              <div className={style.userShowInfo}>
                <CalendarToday className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>10.12.1999</span>
              </div>
              <span className={style.userShowTitle}>Contact Details</span>
              <div className={style.userShowInfo}>
                <PhoneAndroid className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>+1 123 456 67</span>
              </div>
              <div className={style.userShowInfo}>
                <MailOutline className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>annabeck99@gmail.com</span>
              </div>
              <div className={style.userShowInfo}>
                <LocationSearching className={style.userShowIcon} />
                <span className={style.userShowInfoTitle}>New York | USA</span>
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
                    placeholder="annabeck99"
                    className={style.userUpdateInput}
                  />
                </div>
                <div className={style.userUpdateItem}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className={style.userUpdateInput}
                  />
                </div>
                <div className={style.userUpdateItem}>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className={style.userUpdateInput}
                  />
                </div>
                <div className={style.userUpdateItem}>
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className={style.userUpdateInput}
                  />
                </div>
                <div className={style.userUpdateItem}>
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className={style.userUpdateInput}
                  />
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
                <button className={style.userUpdateButton}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }