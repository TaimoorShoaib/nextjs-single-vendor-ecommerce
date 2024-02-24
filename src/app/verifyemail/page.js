"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./verifyemail.module.css";

export default function VerifyEmailPage() {
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
      console.log(error.response.message);
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

  return (
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
  );
}
