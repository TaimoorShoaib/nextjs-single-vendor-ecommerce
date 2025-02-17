import Joi from "joi";
import Order from "../../../../models/order";
import { auth } from "../../../../helpers/auth";
import User from "../../../../models/usermodel";
import { NextResponse } from "next/server";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
export async function DELETE(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }

    const getOrderSchema = Joi.object({
      userId: Joi.string().regex(mongodbIdPattern).required(),
      orderId: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = getOrderSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const { userId, orderId } = requestBody;

    const order = await Order.findById({ _id: orderId });

    const userAdmin = await User.findById({ _id: userId });
    if (!userAdmin) {
      return NextResponse.json(
        { error: "You are not an Admin" },
        { status: 401 }
      );
    }
    if (!order) {
      return NextResponse.json(
        { error: "There is no Order with this id" },
        { status: 404 }
      );
    }
    await order.deleteOne();
    const response = NextResponse.json(
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
