"use client";
import style from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Navbar() {
  let dispatch = useDispatch();
  let isAuthenticated = useSelector((state) => state.user.auth);

  return (
    <>
      <nav className={`${style.navbar}`}>
        <a className={`${style.logo} `} href="/">
          CoinBounce
        </a>
        <a className={style.ahead} href="/">
          Home
        </a>
        <a className={style.ahead} href="/crypto">
          Crypto
        </a>
        <a className={style.ahead} href="/blogs">
          Blogs
        </a>
        <a className={style.ahead} href="/submit">
          Submit a blog
        </a>
        {isAuthenticated ? (
          <div>
            <a>
              <button className={style.signOutButton}>Sign out</button>
            </a>{" "}
          </div>
        ) : (
          <div>
            <a
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
              href="/login"
            >
              <button className={style.logInButton}>log In</button>
            </a>
            <a
              className={({ isActive }) =>
                isActive ? style.activeStyle : style.inActiveStyle
              }
              href="/signup"
            >
              <button className={style.signUpButton}>Sign up</button>
            </a>{" "}
          </div>
        )}
      </nav>
      <div className={style.saparator}></div>
    </>
  );
}
