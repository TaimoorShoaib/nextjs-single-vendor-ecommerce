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
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const refreshToken = req.cookies.get("refreshToken").value;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return NextResponse.json(
        { message: "Token not found in the DB" },
        { status: 404 }
      );
    }
    try {
      cookies().delete("accessToken");
      cookies().delete("refreshToken");
    } catch (error) {
      return NextResponse.json(
        { message: "cookies not found" },
        { status: 404 }
      );
    }
    const response = NextResponse.json(
      {
        message: "Logout successfully",
        success: true,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Return a more informative error message
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
