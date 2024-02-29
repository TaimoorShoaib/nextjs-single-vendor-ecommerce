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

export async function DELETE(req) {
  try {
    // validate
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = getByIdSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const { id } = requestBody;
    try {
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
