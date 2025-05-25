import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email } = await request.json();

  try {
    const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_ACCESS_TOKEN, {
      expiresIn: '1h',
    });
     const cookieStore = cookies();
    cookieStore.set('pilotNo', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
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
