"use client";

import React from "react"
import { updateProfile } from "../../../../ApiRequest/internalapi";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState , useEffect } from "react";
import updateProfileSchem from "../../../../Schemas/updateProfileSchem";
import style from "./updateProfile.module.css";
import { useSelector} from "react-redux";
import TextInput from "../../../../components/TextInput";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import Loader from "../../../../components/Loader/loader";
import Protected from "../../../../components/protected/protected";
const UpdateProfile = () => {

  const  user  = useSelector(
    (state) => state.user
  );
  const  isAuth  = user.auth
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const handleLogin = async () => {
    const data = {
        username: values.username,
        userId:user._id
    };
setLoader(true)
    const response = await updateProfile(data);
    if (response && response.status === 201) {
   
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
     username: "",
     
    },
    validationSchema: updateProfileSchem,
  });
  //{props.error && <p className={style.errorMessage}>{errors.password}</p>}
  
  const loading1 = useAutoLogin();

  return loading1 ? (
    <Loader />
  ) : (
    <Protected isAuth={isAuth}>
    <div className={style.loginPageBackground}>
      <div className={style.leftSideImage}>
    <div className={style.loginWrapper}>
    <hr/>
      <div className={style.loginHeader}>{loader ?  "Processing..." :"update username" }</div>
      <hr/>
      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your new username"
        
      />
      </div>
      {errors.username && touched.username && <p className={style.errorMessageTouch}>{errors.username}</p> }

      <button
        className={style.loginbutton}
        onClick={handleLogin}
        disabled={
          !values.username || errors.username
        }
      >
        Update username
      </button>
      
      {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
    </div>
    </div>
    </div>
    </Protected>
  );
}

export default UpdateProfile