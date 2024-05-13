"use client";

import React from "react"
import { updatePassword } from "../../../../ApiRequest/internalapi";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState , useEffect } from "react";
import updatePasswordSchema from "../../../../Schemas/updatePasswordSchema";
import style from "./updatePassword.module.css";
import { useSelector} from "react-redux";
import TextInput from "../../../../components/TextInput";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import Loader from "../../../../components/Loader/loader";
import Protected from "../../../../components/protected/protected";
import Link from "next/link";
const UpdatePassword = () => {

  const  user  = useSelector(
    (state) => state.user
  );
  const  isAuth  = user.auth
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const handleLogin = async () => {
    const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        userId:user._id
    };
setLoader(true)
    const response = await updatePassword(data);
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
     oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
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
      <div className={style.loginHeader}>{loader ?  "Processing..." :"update password" }</div>
      <hr/>
      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        value={values.oldPassword}
        name="oldPassword"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your Old Password"
        
      />
      </div>
      {errors.oldPassword && touched.oldPassword && <p className={style.errorMessageTouch}>{errors.oldPassword}</p> }
      <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        name="newPassword"
        value={values.newPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your New Password"
       
      />
      

       </div>
       {errors.newPassword && touched.newPassword && <p className={style.errorMessageTouch}>{errors.newPassword}</p> }

       <div className={style.emailContainer}>
      <LockOutlinedIcon className={style.lockIcon}/>
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter your New Password"
       
      />
      

       </div>
       {errors.confirmPassword && touched.confirmPassword && <p className={style.errorMessageTouch}>{errors.confirmPassword}</p> }

       <p className={style.forgotPassword} onClick={() => router.push("/forgotPassword")}>forgot password?</p>

      <button
        className={style.loginbutton}
        onClick={handleLogin}
        disabled={
          !values.confirmPassword || !values.newPassword|| !values.oldPassword || errors.confirmPassword || errors.newPassword|| errors.oldPassword
        }
      >
        Update password
      </button>
      
      {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
      <p>Dont want to update ? <Link href={"/user/profile/myProfile"}>My Profile</Link></p>
    </div>
    </div>
    </div>
    </Protected>
  );
}

export default UpdatePassword