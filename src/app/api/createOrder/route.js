import Joi from "joi";

export async function POST(req) {
  try {
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
