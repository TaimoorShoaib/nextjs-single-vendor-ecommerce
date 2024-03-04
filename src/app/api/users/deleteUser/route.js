import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";
import User from "../../../../models/usermodel";

import { NextResponse } from "next/server";

import { auth } from "../../../../helpers/auth";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
connect();

export async function DELETE(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }
    // validate
    const getByIdSchema = Joi.object({
      userId: Joi.string().regex(mongodbIdPattern).required(),
      ownerId: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = getByIdSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const { userId, ownerId } = requestBody;

    const adminExist = await User.findById({ _id: ownerId });
    if (!adminExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    } else if (adminExist.isAdmin === false) {
      return NextResponse.json(
        { message: "you are not an admin" },
        { status: 401 }
      );
    }
    try {
      await User.findByIdAndDelete({ _id: userId });
    } catch (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const response = NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
