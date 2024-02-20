import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";
import bcrypt from "bcryptjs";
import JWTService from "../../../../helpers/JWTService";
import userDTO from "../../../../dto/user";
import RefreshToken from "../../../../models/RefreshToken";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../helpers/mailer";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

connect();

export async function POST(req) {
  try {
    const userRegisterSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const { email, password } = requestBody;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "email or password is wrong" },
        { status: 401 }
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "email or password is wrong" },
        { status: 401 }
      );
    }

    // update refresh token
    const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    console.log(user._id);
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    if (!user.isVerified) {
      await sendEmail({ email, emailType: "VERIFY", userId: user._id });
    }
    const userDto = new userDTO(user);
    const response = NextResponse.json(
      {
        user: userDto,
        auth: true,
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    response.cookies.set("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
