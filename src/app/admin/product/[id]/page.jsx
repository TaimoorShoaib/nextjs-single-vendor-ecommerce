"use client"
import Link from "next/link";
import style from "./product.module.css";
import Chart from "../../../../components/adminStuff/chart/Chart"
import {productData} from "../../../../components/adminStuff/dummydata/dummydata"
import { Publish } from "@mui/icons-material";
import Topbar from "../../../../components/adminStuff/topbar/Topbar";
import Sidebar from "../../../../components/adminStuff/sideBar/Sidebar";

export default function Product() {
  return (
    <>
    <Topbar/>
  
    <div className={style.product}>
      <div className={style.productTitleContainer}>
        <h1 className={style.productTitle}>Product</h1>
        <Link href="/newproduct">
          <button className={style.productAddButton}>Create</button>
        </Link>
      </div>
      <div className={style.productTop}>
          <div className={style.productTopLeft}>
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className={style.productTopRight}>
              <div className={style.productInfoTop}>
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
                  <span className={style.productName}>Apple Airpods</span>
              </div>
              <div className={style.productInfoBottom}>
                  <div className={style.productInfoItem}>
                      <span className={style.productInfoKey}>id:</span>
                      <span className={style.productInfoValue}>123</span>
                  </div>
                  <div className={style.productInfoItem}>
                      <span className={style.productInfoKey}>sales:</span>
                      <span className={style.productInfoValue}>5123</span>
                  </div>
                  <div className={style.productInfoItem}>
                      <span className={style.productInfoKey}>active:</span>
                      <span className={style.productInfoValue}>yes</span>
                  </div>
                  <div className={style.productInfoItem}>
                      <span className={style.productInfoKey}>in stock:</span>
                      <span className={style.productInfoValue}>no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className={style.productBottom}>
          <form className={style.productForm}>
              <div className={style.productFormLeft}>
                  <label>Product Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className={style.productFormRight}>
                  <div className={style.productUpload}>
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className={style.productUploadImg} />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className={style.productButton}>Update</button>
              </div>
          </form>
      </div>
    </div>
    </>
  );
}