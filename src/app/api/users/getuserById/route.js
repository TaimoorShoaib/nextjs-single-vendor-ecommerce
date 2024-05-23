import { connect } from "../../../../dbconfig/dbconfig";
import User from "../../../../models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
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
      return NextResponse.json({ message: "user not found" }, { status: 401 });
    }

    const response = NextResponse.json(
      {
        user: user,
        success: true,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
