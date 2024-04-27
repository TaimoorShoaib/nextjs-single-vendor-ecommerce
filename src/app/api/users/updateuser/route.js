import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";
import bcrypt from "bcryptjs";
import JWTService from "../../../../helpers/JWTService";
import { sendEmail } from "../../../../helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import userDTO from "../../../../dto/user";
import { auth } from "../../../../helpers/auth";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

connect();

export async function POST(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30),
      email: Joi.string().email(),
      isVerified: Joi.boolean(),
      isAdmin: Joi.boolean(),
      userId: Joi.string().regex(mongodbIdPattern).required(),
      ownerId: Joi.string().regex(mongodbIdPattern).required(),
    });

    const requestBody = await req.json(); // Use 'req.json()' for NextRequest
    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { username, name, email, isVerified, isAdmin, userId, ownerId } =
      requestBody;
    const owner = await User.findById(ownerId);
    const user = await User.findById(userId);
    if (owner.isAdmin === false) {
      return NextResponse.json(
        { message: "you are not an admin" },
        { status: 401 }
      );
    } else if (!username && !name && !email && !isVerified && !isAdmin) {
      return NextResponse.json(
        { message: "You have not updated anything" },
        { status: 400 }
      );
    }
    user.username = username ? username : user.username;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.isVerified = isVerified;
    user.isAdmin = isAdmin;
    await user.save();

    return NextResponse.json(
      { message: "user updated successfully" },
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
