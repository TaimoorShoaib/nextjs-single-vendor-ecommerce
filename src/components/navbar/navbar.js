"use client";
import style from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../lib/userSlice";
import { signout } from "../../ApiRequest/internalapi";
import Link from "next/link";
export default function Navbar() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let isAuthenticated = user.auth;
  let isAdmin = user.isAdmin;
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
        <Link className={style.ahead} href="/cart">
          Cart
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
