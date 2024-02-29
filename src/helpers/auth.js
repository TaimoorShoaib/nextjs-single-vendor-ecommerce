import { connect } from "../dbconfig/dbconfig";

import JWTService from "./JWTService";
import userDTO from "../dto/user";
import User from "../models/usermodel";
import { NextResponse } from "next/server";
connect();
export async function auth(req) {
  try {
    const refreshToken = req.cookies.get("refreshToken");
    const accessToken = req.cookies.get("accessToken");
    if (!refreshToken || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let id;
    try {
      id = JWTService.verifyAccessToken(accessToken.value);
    } catch (error) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
    let user;
    try {
      user = await User.findOne({ _id: id });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If authentication is successful, return null
    return null;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
