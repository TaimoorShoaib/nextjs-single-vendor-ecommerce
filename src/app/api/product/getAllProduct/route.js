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
import ApiFeatures from "../../../../helpers/apifeatures";
connect();

export async function POST(req) {
  try {
    const getAllProductSchema = Joi.object({
      name: Joi.string(),
      page: Joi.number(),
    });
    const requestBody = await req.json();

    const { error } = getAllProductSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const { name, page } = requestBody;

    console.log(name);
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    // Pass req.query to ApiFeatures constructor
    const apiFeature = new ApiFeatures(Product.find(), name, page).search();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();
    const response = NextResponse.json(
      {
        Products: products,
        success: true,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
