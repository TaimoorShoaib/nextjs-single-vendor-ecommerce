import { connect } from "../../../../dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/usermodel";
import bcryptjs from "bcryptjs";
import Joi from "joi";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

connect();

export async function POST(req) {
  try {
    const userRegisterSchema = Joi.object({
      token: Joi.string().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const reqBody = await req.json();
    const { error } = userRegisterSchema.validate(reqBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const { password, confirmPassword, token } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "password and confirm should match " },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password changed", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
