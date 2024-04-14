"use client"
import React from "react";

import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
     

      <div className={style.midFooter}>
        <h1>DRAGOZ.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; </p>
      </div>

      <div className={style.rightFooter}>
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/taimoorshoaib1/?next=%2F">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;