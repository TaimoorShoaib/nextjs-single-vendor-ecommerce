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
      userId: Joi.string().regex(mongodbIdPattern).required(),
      oldPassword: Joi.string().pattern(passwordPattern).required(),
      newPassword: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("newPassword"),
    });

    const requestBody = await req.json(); // Use 'req.json()' for NextRequest
    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { userId, newPassword, confirmPassword, oldPassword } = requestBody;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 400 }
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Encrypt the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
