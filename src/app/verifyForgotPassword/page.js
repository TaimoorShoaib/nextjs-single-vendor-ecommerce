"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import verifyPasswordSchema from "../../Schemas/verifyPasswordSchema";
import style from "./forgotPassword.module.css";

import TextInput from "../../components/TextInput";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { VerifyForgotPasswordApi } from "../../ApiRequest/internalapi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const VerifyForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const Submit = async () => {
    try {
      const data = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        token: values.token,
      };
      setLoading(true);
      const response = await VerifyForgotPasswordApi(data);
      if (response && response.status === 200) {
        // Redirect to home page

        router.push("/login");
        console.log(response);
      } else if (response.code === "ERR_BAD_REQUEST") {
        setError(response.response.data.message);
      }
    } catch (error) {
      setError(response.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
    validationSchema: verifyPasswordSchema,
  });
  //{props.error && <p className={style.errorMessage}>{errors.password}</p>}
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    values.token = urlToken;
  }, []);

  return (
    <div className={style.loginPageBackground}>
      <div className={style.loginWrapper}>
        <hr />
        <div className={style.loginHeader}>
          {loading ? "Processing" : "forgot password"}
        </div>
        <hr />
        <div className={style.emailContainer}>
          <LockOutlinedIcon className={style.lockIcon} />
          <TextInput
            type="password"
            value={values.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        {errors.password && touched.password && (
          <p className={style.errorMessageTouch}>{errors.password}</p>
        )}
        <div className={style.emailContainer}>
          <LockOutlinedIcon className={style.lockIcon} />
          <TextInput
            type="text"
            value={values.confirmPassword}
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <p className={style.errorMessageTouch}>{errors.confirmPassword}</p>
        )}
        <button
          className={style.loginbutton}
          onClick={Submit}
          disabled={
            !values.confirmPassword ||
            errors.confirmPassword ||
            !values.password ||
            errors.password
          }
        >
          Submit
        </button>
        <span>
          Dont have a account ?{" "}
          <button
            className={style.createAccount}
            onClick={() => router.push("/signup")}
          >
            Register
          </button>
        </span>
        {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
