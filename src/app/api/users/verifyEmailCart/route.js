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
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
connect();

export async function POST(req) {
  try {
    const userRegisterSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const { id } = requestBody;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json(
        { message: "email or password is wrong" },
        { status: 401 }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 401 }
      );
    }
    if (!user.isVerified) {
      await sendEmail({
        email: user.email,
        emailType: "VERIFY",
        userId: user._id,
      });
    }

    const response = NextResponse.json(
      {
        message: "Email is sent please check you Email",
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
