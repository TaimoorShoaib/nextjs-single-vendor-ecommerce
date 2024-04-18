"use client"
import style from "./newProduct.module.css";

export default function NewProduct() {
  return (
    <div className={style.newProduct}>
      <h1 className={style.addProductTitle}>New Product</h1>
      <form className={style.addProductForm}>
        <div className={style.addProductItem}>
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className={style.addProductItem}>
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className={style.addProductItem}>
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>
        <div className={style.addProductItem}>
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className={style.addProductButton}>Create</button>
      </form>
    </div>
  );
}