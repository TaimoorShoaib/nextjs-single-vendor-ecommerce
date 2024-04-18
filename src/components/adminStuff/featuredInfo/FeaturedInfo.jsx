"use client"
import style from "./featuredInfo.module.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo() {
  return (
    <div className={style.featured}>
      <div className={style.featuredItem}>
        <span className={style.featuredTitle}>Revanue</span>
        <div className={style.featuredMoneyContainer}>
          <span className={style.featuredMoney}>$2,415</span>
          <span className={style.featuredMoneyRate}>
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className={style.featuredSub}>Compared to last month</span>
      </div>
      <div className={style.featuredItem}>
        <span className={style.featuredTitle}>Sales</span>
        <div className={style.featuredMoneyContainer}>
          <span className={style.featuredMoney}>$4,415</span>
          <span className={style.featuredMoneyRate}>
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className={style.featuredSub}>Compared to last month</span>
      </div>
      <div className={style.featuredItem}>
        <span className={style.featuredTitle}>Cost</span>
        <div className={style.featuredMoneyContainer}>
          <span className={style.featuredMoney}>$2,225</span>
          <span className={style.featuredMoneyRate}>
            +2.4 <ArrowUpward className={style.featuredIcon}/>
          </span>
        </div>
        <span className={style.featuredSub}>Compared to last month</span>
      </div>
    </div>
  );
}