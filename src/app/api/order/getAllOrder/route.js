import Joi from "joi";
import Order from "../../../../models/order";
import { auth } from "../../../../helpers/auth";
import User from "../../../../models/usermodel";
import { NextResponse } from "next/server";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
export async function POST(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }

    const getOrderSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = getOrderSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const { id } = requestBody;

    const orders = await Order.find();

    const userAdmin = await User.findById({ _id: id });
    if (!userAdmin) {
      return NextResponse.json(
        { error: "You are not an Admin" },
        { status: 401 }
      );
    }
    if (!orders) {
      return NextResponse.json(
        { error: "There is no Order Yet" },
        { status: 404 }
      );
    }
    const response = NextResponse.json(
      {
        Order: orders,
      },
      {
        success: true,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
