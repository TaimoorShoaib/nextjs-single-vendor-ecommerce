import { connect } from "../../../../dbconfig/dbconfig";
import User from "../../../../models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const user = await User.find();

    const response = NextResponse.json(
      {
        Users: user,
        success: true,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
