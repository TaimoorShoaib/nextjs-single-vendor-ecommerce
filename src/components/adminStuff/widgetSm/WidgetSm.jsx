"use client"

import  style from "./widgetSm.module.css";
import { Visibility } from "@mui/icons-material";

export default function WidgetSm() {
  return (
    <div className={style.widgetSm}>
      <span className={style.widgetSmTitle}>New Join Members</span>
      <ul className={style.widgetSmList}>
        <li className={style.widgetSmListItem}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={style.widgetSmImg}
          />
          <div className={style.widgetSmUser}>
            <span className={style.widgetSmUsername}>Anna Keller</span>
            <span className={style.widgetSmUserTitle}>Software Engineer</span>
          </div>
          <button className={style.widgetSmButton}>
            <Visibility className={style.widgetSmIcon} />
            Display
          </button>
        </li>
        <li className={style.widgetSmListItem}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={style.widgetSmImg}
          />
          <div className={style.widgetSmUser}>
            <span className={style.widgetSmUsername}>Anna Keller</span>
            <span className={style.widgetSmUserTitle}>Software Engineer</span>
          </div>
          <button className={style.widgetSmButton}>
            <Visibility className={style.widgetSmIcon} />
            Display

          </button>
        </li>
        <li className={style.widgetSmListItem}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={style.widgetSmImg}
          />
          <div className={style.widgetSmUser}>
            <span className={style.widgetSmUsername}>Anna Keller</span>
            <span className={style.widgetSmUserTitle}>Software Engineer</span>
          </div>
          <button className={style.widgetSmButton}>
            <Visibility className={style.widgetSmIcon} />
            Display
          </button>
        </li>
        <li className={style.widgetSmListItem}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={style.widgetSmImg}
          />
          <div className={style.widgetSmUser}>
            <span className={style.widgetSmUsername}>Anna Keller</span>
            <span className={style.widgetSmUserTitle}>Software Engineer</span>
          </div>
          <button className={style.widgetSmButton}>
            <Visibility className={style.widgetSmIcon} />
            Display
          </button>
        </li>
        <li className={style.widgetSmListItem}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={style.widgetSmImg}
          />
          <div className={style.widgetSmUser}>
            <span className={style.widgetSmUsername}>Anna Keller</span>
            <span className={style.widgetSmUserTitle}>Software Engineer</span>
          </div>
          <button className={style.widgetSmButton}>
            <Visibility className={style.widgetSmIcon} />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}