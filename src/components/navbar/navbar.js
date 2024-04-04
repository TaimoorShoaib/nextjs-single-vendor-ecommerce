"use client";
import style from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../lib/userSlice";
import { signout } from "../../ApiRequest/internalapi";
import Link from "next/link";
export default function Navbar() {
  let dispatch = useDispatch();
  let isAuthenticated = useSelector((state) => state.user.auth);
  const handleSignout = async () => {
    await signout();

    dispatch(resetUser());
  };
  return (
    <>
      <nav className={`${style.navbar}`}>
        <Link className={`${style.logo} `} href="/">
          CoinBounce
        </Link>
        <Link className={style.ahead} href="/">
          Home
        </Link>
        <Link className={style.ahead} href="/crypto">
          Crypto
        </Link>
        <Link className={style.ahead} href="/blogs">
          Blogs
        </Link>
        <Link className={style.ahead} href="/submit">
          Submit a blog
        </Link>
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
