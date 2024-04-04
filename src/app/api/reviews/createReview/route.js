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
import { auth } from "../../../../helpers/auth";
connect();

export async function POST(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }
    const accessToken = req.cookies.get("accessToken");

    const createReviewSchema = Joi.object({
      rating: Joi.number().max(5).required(),
      comment: Joi.string().required(),
      productId: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = createReviewSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const { rating, comment, productId } = requestBody;

    const userId = JWTService.verifyAccessToken(accessToken.value)._id;
    const userData = await User.findById(userId);
    const userName = userData.username;
    ///const userName = req.user && req.user.name; // Check if req.user exists and then access name property
    const review = {
      user: userId,
      name: userName,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 }
      );
    }
    const isReviewed = product.reviews.find(
      (rev) => rev.user && rev.user.toString() === userId
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === userId) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    const response = NextResponse.json({ success: true }, { status: 201 });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
