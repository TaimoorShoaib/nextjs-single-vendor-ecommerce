import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";
import bcrypt from "bcryptjs";
import JWTService from "../../../../helpers/JWTService";
import { sendEmail } from "../../../../helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import userDTO from "../../../../dto/user";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

connect();

export async function POST(req) {
  try {
    const userRegisterSchema = Joi.object({
      username: Joi.string().required(),
      userId: Joi.string().regex(mongodbIdPattern).required(),
    });

    const requestBody = await req.json(); // Use 'req.json()' for NextRequest
    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { username, userId } = requestBody;
    const user = await User.findById(userId);

    if (username === user.username) {
      return NextResponse.json(
        { error: "You have not changed the name" },
        { status: 400 }
      );
    }

    user.username = username;
    await user.save();

    return NextResponse.json(
      { message: "username updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
