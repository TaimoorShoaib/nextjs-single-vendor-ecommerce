"use client"

import React, { useState, Fragment } from "react";
import { useSelector} from "react-redux";

import MetaData from "../../components/MetaData/metaData";
import style from "./search.module.css";
import { useRouter } from 'next/navigation';
import useAutoLogin from "../../hooks/useAutoLogin";
import Protected from "../../components/protected/protected";
import Loader from "../../components/Loader/loader.jsx";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Search = () => {
  const router = useRouter();
  const loading1 = useAutoLogin();
  const [keyword, setKeyword] = useState("");
  const isAuth = useSelector((state) => state.user.auth);


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/product/products/${keyword}`);
    } else {
      router.push("/products");
    }
  };
  if (loading1) {
    return <Loader />;
  }
  return (
    <Protected isAuth={isAuth}>
      
      <Navbar/>
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className={style.searchBox} onSubmit={searchSubmitHandler}>
        <input
        className={style.searchBoxinputtext}
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input  className={style.searchBoxinputsubmit} type="submit" value="Search" />
      </form>
    
    </Fragment>
    <Footer/>
  
    </Protected>
    
  )
};

export default Search;