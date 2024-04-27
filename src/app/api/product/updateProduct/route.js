import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";
import bcrypt from "bcryptjs";
import JWTService from "../../../../helpers/JWTService";
import userDTO from "../../../../dto/user";
import RefreshToken from "../../../../models/RefreshToken";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../helpers/mailer";
import Product from "../../../../models/product";
import fs from "fs";
import { auth } from "../../../../helpers/auth";
import cloudinary from "cloudinary";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
connect();

export async function PUT(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }

    const createProductSchema = Joi.object({
      name: Joi.string().max(30),
      price: Joi.number(),
      Stock: Joi.number().max(9999),
      category: Joi.string(),
      user: Joi.string().regex(mongodbIdPattern).required(),
      images: Joi.array(),
      description: Joi.string(),
      productId: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = createProductSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const {
      name,
      price,
      Stock,
      category,
      user,
      images,
      description,
      productId,
    } = requestBody;
    const userExist = await User.findById({ _id: user });
    let categorySmall = category.toLowerCase();
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
    }
    let product;
    try {
      product = await Product.findOne({ _id: productId });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }

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
    if (images) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
        product.name = name ? name : product.name;
        product.price = price ? price : product.price;
        product.Stock = Stock ? Stock : product.Stock;
        product.images = images ? imagesLink : product.images; // Assign imagesLink directly
        product.category = category ? categorySmall : product.category;
        product.description = description ? description : product.description;
        await product.save();
      } catch (error) {
        return NextResponse.json({ error: error.message }); // Provide specific error message
      }
    } else {
      await Product.updateOne(
        { _id: productId },
        { name, price, Stock, category: categorySmall, description }
      );
    }
    const response = NextResponse.json(
      {
        message: "product updated successfully",
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
