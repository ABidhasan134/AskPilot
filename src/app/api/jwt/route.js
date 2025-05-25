import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email } = await request.json();

  try {
    const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_ACCESS_TOKEN, {
      expiresIn: '1h',
    });

    return NextResponse.json({
      token,
      message: "JWT applied",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
