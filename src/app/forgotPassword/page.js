"use client";

import React from "react";
import { login } from "../../ApiRequest/internalapi";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import sendMailForgotPasswordSchema from "../../Schemas/sendMailForgotPasswordSchema";
import style from "./forgotPassword.module.css";

import TextInput from "../../components/TextInput";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { sendEmailForgotPassword } from "../../ApiRequest/internalapi";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSendMail = async () => {
    try {
      const data = {
        email: values.email,
      };
      setLoading(true);
      const response = await sendEmailForgotPassword(data);
      if (response && response.status === 201) {
        // Redirect to home page

        setMessage(true);
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
      email: "",
    },
    validationSchema: sendMailForgotPasswordSchema,
  });
  //{props.error && <p className={style.errorMessage}>{errors.password}</p>}
  return (
    <div className={style.loginPageBackground}>
      <div className={style.loginWrapper}>
        <hr />
        <div className={style.loginHeader}>
          {loading ? "Processing" : "forgot password"}
        </div>
        <hr />
        <div className={style.emailContainer}>
          <PersonOutlinedIcon className={style.lockIcon} />
          <TextInput
            type="text"
            value={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
        </div>
        {errors.email && touched.email && (
          <p className={style.errorMessageTouch}>{errors.email}</p>
        )}
        <button
          className={style.loginbutton}
          onClick={handleSendMail}
          disabled={!values.email || errors.email}
        >
          Send Mail
        </button>
        <p>
          {message
            ? "email is sent Check your email if you do not find it also check your spam"
            : ""}
        </p>
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

export default ForgotPassword;