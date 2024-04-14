"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./verifyemail.module.css";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Loader from "../../../components/Loader/loader";
import PublicStopAuth from "../../../components/publicStopAuth/publicStopAuth";
import { useSelector } from "react-redux";
export default function VerifyEmailPage() {
  const isAuth = useSelector((state) => state.user.auth);

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      router.push("/");
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  const loading1 = useAutoLogin();

  return loading1 ? (
    <Loader />
  ) : (
    <PublicStopAuth isAuth={isAuth}>
      <div className={style.loginPageBackground}>
        <h1 className={style.h1}>Verify Email</h1>
        <h2 className={style.h2}>{token ? `token: ${token}` : "no token"}</h2>
        {verified && (
          <div>
            <h2>Email Verified</h2>
          </div>
        )}
        {error && (
          <div>
            <h2>Error</h2>
          </div>
        )}
      </div>
    </PublicStopAuth>
  );
}
