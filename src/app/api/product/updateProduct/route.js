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
connect();

export async function PUT(req) {
  const createProductSchema = Joi.object({
    name: Joi.string().max(30),
    price: Joi.number(),
    ratings: Joi.number(),
    Stock: Joi.number().max(9999),
    category: Joi.string(),
    user: Joi.string().regex(mongodbIdPattern).required(),
    images: Joi.string(),
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
    ratings,
    Stock,
    category,
    user,
    images,
    description,
    productId,
  } = requestBody;

  let product;
  try {
    product = await Product.findOne({ _id: productId });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }

  if (images) {
    let previousPhoto = product.images;

    previousPhoto = previousPhoto.split("/").at(-1);
    // delete the previous photo
    fs.unlinkSync(`src/storage/${previousPhoto}`);

    // read the buffer
    const buffer = Buffer.from(
      images.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    //give it a name
    const imagePath = `${Date.now()}-${user}.png`;
    // save it locally
    try {
      fs.writeFileSync(`src/storage/${imagePath}`, buffer);
    } catch (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    await Product.updateOne(
      { _id: productId },
      {
        name,
        price,
        ratings,
        Stock,
        category,
        description,
        images: `${process.env.DOMAIN}/storage/${imagePath}`,
      }
    );
  } else {
    await Product.updateOne(
      { _id: productId },
      { name, price, ratings, Stock, category, description }
    );
  }
  const response = NextResponse.json(
    {
      message: "product updated successfully",
    },
    { status: 200 }
  );
  return response;
}
