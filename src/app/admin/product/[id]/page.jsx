"use client"

import React, { Fragment, useEffect, useState } from "react";
import style from "./product.module.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct  } from "../../../../actions/productAction";
//import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../../../components/MetaData/metaData"
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import useAutoLogin from "../../../../hooks/useAutoLogin";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import {GetProduct} from "../../../../ApiRequest/internalapi"
import ProtectedAdmin from "../../../../components/protectedAdmin/protectedAdmin"
import Loader from "../../../../components/Loader/loader";
import Topbar from "../../../../components/adminStuff/topbar/Topbar"
import Footer from "../../../../components/footer/footer"
const UpdateProduct = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const params = useParams()
  const id = params.id
  //const alert = useAlert();
  const loading = useAutoLogin();
  const [productDetail, setProductDetail] = useState();

  

  const {  error:updateError, isUpdated } = useSelector((state) => state.product);
  const ownerId =  useSelector(
    (state) => state.user._id
  );
  const isAdmin =  useSelector(
    (state) => state.user.isAdmin
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  console.log(imagesPreview)
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  useEffect(() => {
    (async function getBlogDetail() {
      const response = await GetProduct(id);
      if (response.status === 200) {
        setProductDetail(response.data.Product);
   
      }
    })();
  }, []);
  useEffect(() => {
    if(productDetail){
        setName(productDetail.name)
        setPrice(productDetail.price)
        setDescription(productDetail.description)
        setCategory(productDetail.category)
        setStock(productDetail.Stock)
        setOldImages(productDetail.images)
    }
    if (updateError) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
     // alert.success("Product Created Successfully");
      router.push("/admin/home");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [dispatch,updateError,  isUpdated,productDetail]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("user", ownerId);
    myForm.set("productId", id);
    if (images.length > 0) {
        images.forEach((image) => {
          myForm.append("images", image);
        });
      }
    
    dispatch(updateProduct(myForm));
    //router.push("/admin/home")
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
setOldImages([])
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  if( loading){
    return <Loader/>
 }
  return (
    <ProtectedAdmin isAdmin={isAdmin}>
      <MetaData title="Create Product" />
      <Topbar/>
      <div className={style.dashboard}>
      
        <div className={style.newProductContainer}>
          <form
            className={style.createProductForm}
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className={style.newProductContainerh1}>Create Product</h1>

            <div className={style.createProductFormdiv}>
              <SpellcheckIcon />
              <input
              className={style.createProductFormdivinput}
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div  className={style.createProductFormdiv}>
              <AttachMoneyIcon />
              <input
              className={style.createProductFormdivinput}
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div  className={style.createProductFormdiv}>
              <DescriptionIcon />

              <textarea
              className={style.createProductFormdivtextarea}
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div  className={style.createProductFormdiv}>
              <AccountTreeIcon />
              <select value={category} className={style.createProductFormdivselect} onChange={(e) => setCategory(e.target.value)} >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div  className={style.createProductFormdiv}>
              <StorageIcon />
              <input  
              className={style.createProductFormdivinput}
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div className={style.createProductFormFile} >
              <input
              className={style.createProductFormdivinput}
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            <div className={style.createProductFormImage}>
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
            </div>
            <div className={style.createProductFormImage}>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <Footer/>
    </ProtectedAdmin>
  );
};

export default UpdateProduct;
