import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";
import { NextResponse } from "next/server";
import Product from "../../../../models/product";
import fs from "fs";
import cloudinary from "cloudinary";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

//import cloudinary from "cloudinary";
import { auth } from "../../../../helpers/auth";
connect();

export async function POST(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }
    const createProductSchema = Joi.object({
      name: Joi.string().max(30).required(),
      price: Joi.number().required(),
      Stock: Joi.number().max(9999).required(),
      category: Joi.string().required(),
      user: Joi.string().regex(mongodbIdPattern).required(),
      images: Joi.array().required(),
      description: Joi.string().required(),
    });
    const requestBody = await req.json();

    const { error } = createProductSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const {
      name,
      price,
      ratings,
      Stock,
      numOfReviews,
      category,
      user,
      images,
      reviews,
      description,
      productSold,
    } = requestBody;
    const userExist = await User.findById({ _id: user });
    const Productname = await User.findOne({ name: name });
    if (Productname) {
      return NextResponse.json(
        { message: "product name is already in use use another product name" },
        { status: 400 }
      );
    }
    if (!userExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    } else if (userExist.isAdmin === false) {
      return NextResponse.json(
        { message: "you are not an admin" },
        { status: 401 }
      );
    } else if (userExist.isAdmin === true) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      let imagesArray = [];
      if (typeof images === "string") {
        imagesArray.push(images);
      } else {
        imagesArray = images;
      }
      let imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      let newProduct;
      try {
        let categorySmall = category.toLowerCase();

        newProduct = new Product({
          name,
          price,
          ratings,
          Stock,
          numOfReviews,
          category: categorySmall,
          user,
          images: imagesLink, //images.map((image) => ({ url: image.url })), // Convert URLs to objects with 'url' property
          reviews,
          description,
          productSold,
        });
        await newProduct.save();
      } catch (error) {
        return NextResponse.json({ error: error.message }); // Provide specific error message
      }

      const response = NextResponse.json(
        {
          Product: newProduct,
        },
        { status: 201 }
      );

      return response;
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
