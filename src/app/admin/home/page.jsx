"use client"
import Chart from "../../../components/adminStuff/chart/Chart";
import FeaturedInfo from "../../../components/adminStuff/featuredInfo/FeaturedInfo";
import style from "./adminHome.module.css";
import { userData } from "../../../components/adminStuff/dummydata/dummydata";
import WidgetSm from "../../../components/adminStuff/widgetSm/WidgetSm";
import WidgetLg from "../../../components/adminStuff/widgetLg/WidgetLg";
import Sidebar from "../../../components/adminStuff/sideBar/Sidebar"
import Topbar from "../../../components/adminStuff/topbar/Topbar"
export default function Home() {
  return (
    <>
        <Topbar/>
        
    <div className={style.home}>
        
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className={style.homeWidgets}>
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
   
    </>
  );
}