import React from "react";
import style from "./topbar.module.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className={style.topbar}>
      <div className={style.topbarWrapper}>
        <div className={style.topLeft}>
          <span className={style.logo}>lamaadmin</span>
        </div>
        <div className={style.topRight}>
          <div className={style.topbarIconContainer}>
            <NotificationsNone />
            <span className={style.topIconBadge}>2</span>
          </div>
          <div className={style.topbarIconContainer}>
            <Language />
            <span className={style.topIconBadge}>2</span>
          </div>
          <div className={style.topbarIconContainer}>
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className={style.topAvatar} />
        </div>
      </div>
    </div>
  );
}