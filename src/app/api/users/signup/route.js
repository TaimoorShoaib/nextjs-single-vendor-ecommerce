import { connect } from "@/dbconfig/dbconfig";
import Joi from "joi";
import User from "@/models/usermodel";
import bcrypt from "bcryptjs";
import JWTService from "@/helpers/JWTService";
import { sendEmail } from "../../../../helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import userDTO from "../../../../dto/user";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

connect();

export async function POST(req) {
  // Use 'req' for clarity
  try {
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });

    const requestBody = await req.json(); // Use 'req.json()' for NextRequest
    const { error } = userRegisterSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const { username, name, email, password } = requestBody;
    const userNameAlreadyExist = await User.findOne({ username: username });
    const emailAlreadyExist = await User.findOne({ email: email });

    if (userNameAlreadyExist || emailAlreadyExist) {
      if (userNameAlreadyExist && emailAlreadyExist) {
        return NextResponse.json(
          {
            error:
              "username and Email is already taken please try with different credential",
          },
          { status: 409 }
        );
      } else if (userNameAlreadyExist) {
        return NextResponse.json(
          {
            error: "username is already taken please enter another username",
          },
          { status: 409 }
        );
      } else if (emailAlreadyExist) {
        return NextResponse.json(
          {
            error: "Email is already taken please enter another Email",
          },
          { status: 409 }
        );
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      username,
      email,
      name,
      password: hashedPassword,
    }).save(); // Combine user creation and saving

    const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

    await JWTService.storeRefreshToken(refreshToken, user._id);

    /* return NextResponse.json({ user, auth: true })
      .cookies.set("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      .cookies.set("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });*/
    const userDto = new userDTO(user);
    const response = NextResponse.json(
      {
        userDto,
        auth: true,
      },
      { status: 201 }
    );
    response.cookies.set("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    response.cookies.set("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    //send  verifuaction email
    await sendEmail({ email, emailType: "VERIFY", userId: user._id });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    ); // Generic error message
  }
}
