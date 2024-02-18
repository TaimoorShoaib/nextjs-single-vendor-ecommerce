"use client";

import React from 'react'
import {login} from "../../ApiRequest/internalapi"
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { useState , useEffect } from 'react';
import loginSchema from '../../Schemas/loginSchema'
import style from "./login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from '../../lib/userSlice';
import TextInput from "../../components/TextInput"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await login(data);
    if (response && response.status === 200) {
      // Set user
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
        isAdmin:response.data.user.isAdmin,
        isVerified:response.data.user.isVerified
      };
      dispatch(setUser(user));
      // Redirect to home page
      router.push("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });
  //{props.error && <p className={style.errorMessage}>{errors.password}</p>}
  return (
    <div className={style.loginPageBackground}>
    <div className={style.loginWrapper}>
    <hr/>
      <div className={style.loginHeader}>login</div>
      <hr/>
      <div className={style.emailContainer}>
      <PersonOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="text"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your Email"
        
      />
      </div>
      {errors.email && touched.email && <p className={style.errorMessageTouch}>{errors.email}</p> }
      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your password"
       
      />
      

       </div>
       {errors.password && touched.password && <p className={style.errorMessageTouch}>{errors.password}</p> }
      <p  className={style.forgotPassword}>forgot password</p>
      <button
        className={style.loginbutton}
        onClick={handleLogin}
        disabled={
          !values.email || !values.password || errors.email || errors.password
        }
      >
        Log in
      </button>
      <span>
        Don't have a account ?{" "}
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
}

export default Login