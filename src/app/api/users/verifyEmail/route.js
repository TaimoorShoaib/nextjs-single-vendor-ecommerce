import { connect } from "../../../../dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/usermodel";
connect();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { token } = reqbody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 404 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
