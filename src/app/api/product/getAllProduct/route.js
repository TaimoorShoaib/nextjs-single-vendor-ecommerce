import { connect } from "../../../../dbconfig/dbconfig";
import Joi from "joi";

import { NextResponse } from "next/server";
import Product from "../../../../models/product";

import ApiFeatures from "../../../../helpers/apifeatures";

connect();

export async function POST(req) {
  try {
    const getAllProductSchema = Joi.object({
      name: Joi.string(),
      filters: Joi.object(),
      page: Joi.number(),
    });
    const requestBody = await req.json();

    const { error } = getAllProductSchema.validate(requestBody);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }); // Provide specific error message
    }
    const { name, page, filters } = requestBody;

    console.log(name);
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    // Pass req.query to ApiFeatures constructor
    const apiFeature = new ApiFeatures(Product.find(), name, page, filters)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();
    const response = NextResponse.json(
      {
        Products: products,
        success: true,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
