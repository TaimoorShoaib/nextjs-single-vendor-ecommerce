"use client";

import React from "react"
import {login} from "../../../ApiRequest/internalapi"
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState , useEffect } from "react";
import loginSchema from "../../../Schemas/loginSchema"
import style from "./login.module.css";
import { useDispatch ,useSelector} from "react-redux";
import { setUser } from "../../../lib/userSlice";
import TextInput from "../../../components/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Loader from "../../../components/Loader/loader";
import PublicStopAuth from "../../../components/publicStopAuth/publicStopAuth"
const Login = () => {
  const  isAuth  = useSelector(
    (state) => state.user.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  let user = {}
  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };
setLoader(true)
    const response = await login(data);
    if (response && response.status === 200) {
      // Set user
       user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
        isAdmin:response.data.user.isAdmin,
        isVerified:response.data.user.isVerified
      };
if(user.isVerified === false){
  
  return router.push("/user/checkYourEmail");
}
dispatch(setUser(user));
      setLoader(false)
      // Redirect to home page
      router.push("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setLoader(false)
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
  
  const loading1 = useAutoLogin();

  return loading1 ? (
    <Loader />
  ) : (
    <PublicStopAuth isAuth={isAuth}>
    <div className={style.loginPageBackground}>
      <div className={style.leftSideImage}>
    <div className={style.loginWrapper}>
    <hr/>
      <div className={style.loginHeader}>{loader ?  "Processing..." :"login" }</div>
      <hr/>
      <div className={style.emailContainer}>
      <PersonOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="email"
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
       <p className={style.forgotPassword} onClick={() => router.push("/user/forgotPassword")}>forgot password?</p>

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
        Dont have a account ?{" "}
        <button
          className={style.createAccount}
          onClick={() => router.push("/user/signup")}
        >
          Register
        </button>
      </span>
      {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
    </div>
    </div>
    </div>
    </PublicStopAuth>
  );
}

export default Login