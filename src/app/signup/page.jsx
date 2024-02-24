"use client";

import React from "react"
import {signup} from "../../ApiRequest/internalapi"
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState , useEffect } from "react";
import signupSchema from "../../Schemas/signupSchema"
import style from "./signup.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/userSlice";
import TextInput from "../../components/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailIcon from '@mui/icons-material/Email';
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLogin = async () => {
     const data = {
        username: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

    const response = await signup(data);
    if (response && response.status === 201) {
      // Set user
      const user = {
        _id: response.data.userDto._id,
        email: response.data.userDto.email,
        username: response.data.userDto.username,
        auth: response.data.auth,
        isAdmin:response.data.userDto.isAdmin,
        isVerified:response.data.userDto.isVerified
      };
      dispatch(setUser(user));
      // Redirect to home page
      router.push("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.error);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });
  //{props.error && <p className={style.errorMessage}>{errors.password}</p>}
  return (
    <div className={style.loginPageBackground}>
        <div className={style.leftSideImage}>
    <div className={style.loginWrapper}>
    <hr/>
      <div className={style.loginHeader}>login</div>
      <hr/>

      <div className={style.emailContainer}>
      <EmailIcon className={style.lockIcon}/>
      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your username"
      />
      </div>
      {errors.username && touched.username && <p className={style.errorMessageTouch}>{errors.username}</p> }


      <div className={style.emailContainer}>
      <PersonOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="text"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your name"

      />
      </div>
      {errors.name && touched.name && <p className={style.errorMessageTouch}>{errors.name}</p>}

      <div className={style.emailContainer}>
      <EmailIcon className={style.lockIcon}/>
      <TextInput
        type="text"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your email"

      />
      </div>
      {errors.email && touched.email && <p className={style.errorMessageTouch}>{errors.email}</p> }

      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        value={values.password}
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your Password"

      />
      </div>
      {errors.password && touched.password && <p className={style.errorMessageTouch}>{errors.password}</p> }
      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your password"

      />
      

       </div>
       {errors.confirmPassword && touched.confirmPassword && (
          <p className={style.errorMessageTouch}>{errors.confirmPassword}</p>
        )}
       

      <button
        className={style.loginbutton}
        onClick={handleLogin}
        disabled={
          !values.email || !values.password|| !values.confirmPassword|| !values.username|| !values.name || errors.email ||errors.confirmPassword ||errors.username || errors.name || errors.password
        }
      >
        Log in
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
    </div>
  );
}

export default Login