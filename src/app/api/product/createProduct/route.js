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
      // read buffer

      /*const myCloud = await cloudinary.v2.uploader.upload(images, {
        folder: "E-commerceDragozProduct",
        width: 150,
        crop: "scale",
      });*/

      // read buffer

      /*  for (let i = 0; i < images.length; i++) {
        const imageData = images[i].url;
        const buffer = new Buffer.from(
          imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
          "base64"
        );
        const imagePath = `${Date.now()}-${name}-${i}.png`; // Define imagePath here
        images[i].url = `${process.env.DOMAIN}/storage/${imagePath}`;
        try {
          fs.writeFileSync(`storage/${imagePath}`, buffer);
        } catch (error) {
          return NextResponse.json({ error: error.message });
        }
      }*/

      //const buffer = Buffer.from(
      //images.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      //"base64"
      //  );

      //give image a name
      //const imagePath = `${Date.now()}-${name}.png`;

      //save it locally E:\TaimoorProjects\Next JS Projects\e-commerce_nextapp\src\storage
      // try {
      //  fs.writeFileSync(`src/storage/${imagePath}`, buffer);
      //} catch (error) {
      //  return NextResponse.json({ error: error.message }); // Provide specific error message
      //}

      let newProduct;
      try {
        newProduct = new Product({
          name,
          price,
          ratings,
          Stock,
          numOfReviews,
          category,
          user,
          images, //images.map((image) => ({ url: image.url })), // Convert URLs to objects with 'url' property
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
