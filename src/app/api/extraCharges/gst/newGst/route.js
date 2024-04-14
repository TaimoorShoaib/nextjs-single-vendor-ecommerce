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

    const createOrderSchema = Joi.object({
      shippingInfo: Joi.object().required(),
      orderItems: Joi.array().required(),
      itemsPrice: Joi.number().required(),
      taxPrice: Joi.number().required(),
      shippingPrice: Joi.number().required(),
      totalPrice: Joi.number().required(),
      user: Joi.string().regex(mongodbIdPattern).required(),
    });
    const requestBody = await req.json();

    const { error } = createOrderSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user,
    } = requestBody;
    const userIsVerify = await User.findById({ _id: user });
    if (!userIsVerify.isVerified) {
      return NextResponse.json(
        { error: "please verify your email" },
        { status: 401 }
      );
    }
    let newOrder;
    try {
      newOrder = new Order({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user,
      });
      await newOrder.save();
    } catch (error) {
      return NextResponse.json({ error: error.message }); // Provide specific error message
    }
    const response = NextResponse.json(
      {
        Order: newOrder,
      },
      { status: 201 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
