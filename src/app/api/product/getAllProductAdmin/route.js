import { connect } from "../../../../dbconfig/dbconfig";

import { NextResponse } from "next/server";
import Product from "../../../../models/product";

connect();

export async function GET(req) {
  try {
    const products = await Product.find();

    const response = NextResponse.json(
      {
        Products: products,
        success: true,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
