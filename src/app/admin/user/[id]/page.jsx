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
import { updateUserAdmin, getUserById } from "../../../../ApiRequest/internalapi";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader/loader";
import ProtectedAdmin from "../../../../components/protectedAdmin/protectedAdmin";
import Topbar from "../../../../components/adminStuff/topbar/Topbar";
import Footer from "../../../../components/footer/footer";

export default function User() {
  const loading1 = useAutoLogin();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  
  const isAdmin2 = useSelector((state) => state.user.isAdmin);
  const _id = useSelector((state) => state.user._id);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    (async function getBlogDetail() {
      const response = await getUserById(id);
      if (response.status === 200) {
        setUserDetail(response.data.user);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (userDetail) {
      setIsVerified(userDetail.isVerified);
      setIsAdmin(userDetail.isAdmin);
      setEmail(userDetail.email);
      setUsername(userDetail.username);
    }
  }, [userDetail]);

  const updateuserSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      isVerified: isVerified,
      isAdmin: isAdmin,
      userId: id,
      ownerId: _id,
    };
    updateUserAdmin(data);
    router.push("/admin/home");
  };

  const handleVerifiedChange = (e) => {
    setIsVerified(e.target.value === "true");
  };

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.value === "true");
  };

  return (
    <>
      {loading1 ? (
        <Loader />
      ) : (
        <ProtectedAdmin isAdmin={isAdmin2}>
          <Topbar />
          <div className={style.user}>
            <div className={style.userTitleContainer}>
              <h1 className={style.userTitle}>Edit User</h1>
              <p >
                <button className={style.userAddButton}>Avtive</button>
              </p>
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
                    <span className={style.userShowUsername}>{username}</span>
                  </div>
                </div>
                <div className={style.userShowBottom}>
                  <span className={style.userShowTitle}>Account Details</span>
                  <div className={style.userShowInfo}>
                    <PermIdentity className={style.userShowIcon} />
                    <span className={style.userShowInfoTitle}>{username}</span>
                  </div>
                  <span className={style.userShowTitle}>Contact Details</span>
                  <div className={style.userShowInfo}>
                    <MailOutline className={style.userShowIcon} />
                    <span className={style.userShowInfoTitle}>{email}</span>
                  </div>
                </div>
              </div>
              <div className={style.userUpdate}>
                <span className={style.userUpdateTitle}>Edit</span>
                <form className={style.userUpdateForm} onSubmit={updateuserSubmitHandler}>
                  <div className={style.userUpdateLeft}>
                    <div className={style.userUpdateItem}>
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder={username}
                        className={style.userUpdateInput}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div className={style.userUpdateItem}>
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder={email}
                        className={style.userUpdateInput}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                    <button className={style.userUpdateButton} type="submit">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </ProtectedAdmin>
      )}
    </>
  );
}