import { connect } from "../../../../dbconfig/dbconfig";
import User from "../../../../models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../../helpers/mailer";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "email have been sent", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
