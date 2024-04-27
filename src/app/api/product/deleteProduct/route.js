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

export async function DELETE(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }
    // validate
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
      userId: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = getByIdSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const { id, userId } = requestBody;

    const userExist = await User.findById({ _id: userId });
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
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ error: "Product Not found" });
      }

      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
      await Product.findByIdAndDelete({ _id: id });
    } catch (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const response = NextResponse.json(
      {
        message: "product deleted successfully",
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
