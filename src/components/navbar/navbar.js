"use client";
import style from "./Navbar.module.css";
import { resetUser } from "../../lib/userSlice";
import { signout } from "../../ApiRequest/internalapi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const isAuthenticated = user.auth;
  const isAdmin = user.isAdmin;
  const [dashBoard, setDashboard] = useState(false);
  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <>
      <nav className={`${style.navbar}`}>
        <Link className={`${style.logo} `} href="/">
          DRAGOZ
        </Link>
        <Link className={style.ahead} href="/">
          Home
        </Link>
        <Link className={style.ahead} href="/product/products">
          Products
        </Link>
        <Link className={style.ahead} href="/search">
          search
        </Link>
        <Link className={style.ahead} href="/user/profile/myProfile">
          Profile
        </Link>

        {isAdmin && (
          <Link className={style.ahead} href="/admin/home">
            DashBoard
          </Link>
        )}
        <div className={style.cartContainer}>
          <Link className={style.ahead} href="/cart">
            <div className={style.cartIconWrapper}>
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <div className={style.cartItemCount}>{cartItems.length}</div>
              )}
            </div>
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
              <button className={style.logInButton}>log In</button>
            </Link>
            <Link
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
              href="/user/signup"
            >
              <button className={style.signUpButton}>Sign up</button>
            </Link>{" "}
          </div>
        )}
      </nav>
      <div className={style.saparator}></div>
    </>
  );
}
