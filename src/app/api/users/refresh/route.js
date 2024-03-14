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

export async function GET(req) {
  // get  refreshtoken form the cookies
  const originalRefreshToken = req.cookies.get("refreshToken");
  // Check if the originalRefreshToken is undefined or null
  if (!originalRefreshToken) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const originalRefreshTokenValue = originalRefreshToken.value;
  let id;
  try {
    id = JWTService.verifyRefreshToken(originalRefreshTokenValue)._id;
  } catch (error) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  // verify refresh token
  try {
    const match = RefreshToken.findOne({
      _id: id,
      token: originalRefreshToken,
    });
    if (!match) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  // generate new refresh token
  try {
    const user = await User.findOne({ _id: id }); // Ensure this happens first
    const accessToken = JWTService.signAccessToken(
      { _id: user._id, isAdmin: user.isAdmin },
      "30m"
    ); // Now you can access user._id

    const refreshToken = JWTService.signRefreshToken(
      { _id: user._id, isAdmin: user.isAdmin },
      "60m"
    );
    // update the db
    await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

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
