import Joi from "joi";
import Order from "../../../../models/order";
import { auth } from "../../../../helpers/auth";
import User from "../../../../models/usermodel";
import { NextResponse } from "next/server";
import Product from "../../../../models/product";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

async function updateStockDelivered(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
async function updateStockProcessing(id, quantity) {
  const product = await Product.findById(id);

  product.Stock += quantity;

  await product.save({ validateBeforeSave: false });
}
export async function POST(req) {
  try {
    const authResult = await auth(req);
    if (authResult !== null) {
      // return res.status(authResult.status).json(authResult); // Return authentication error
      return authResult;
    }

    const getOrderSchema = Joi.object({
      orderId: Joi.string().regex(mongodbIdPattern).required(),
      userId: Joi.string().regex(mongodbIdPattern).required(),
      orderStatus: Joi.string().required(),
    });
    const requestBody = await req.json();

    const { error } = getOrderSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }

    const { orderId, userId, orderStatus } = requestBody;

    const order = await Order.findById({ _id: orderId });

    const userAdmin = await User.findById({ _id: userId });
    if (!userAdmin) {
      return NextResponse.json(
        { error: "You are not an Admin" },
        { status: 401 }
      );
    } else if (!order) {
      return NextResponse.json(
        { error: "Order not found with this id" },
        { status: 404 }
      );
    }
    if (order.orderStatus === "Processing") {
      order.orderItems.forEach(async (o) => {
        await updateStockDelivered(o.product, o.quantity);
      });

      order.orderStatus = orderStatus;
      if (orderStatus === "Delivered") {
        order.deliveredAt = Date.now();
      }
    } else if (order.orderStatus === "Delivered") {
      order.orderItems.forEach(async (o) => {
        await updateStockProcessing(o.product, o.quantity);
      });

      order.orderStatus = orderStatus;
      if (orderStatus === "Processing") {
        order.deliveredAt = Date.now();
      }
    }
    await order.save({ validateBeforeSave: false });

    const response = NextResponse.json(
      {
        OrderStatus: orderStatus,
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
