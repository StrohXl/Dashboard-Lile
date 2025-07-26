import { NextRequest, NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const cookiesRequest = request.cookies;
  const token = cookiesRequest.get("myToken");
  if (token) {
    try {
      const key = process.env.JWT_KEY;
      const cookieStore = await cookies();
      jwt.verify(token.value, key || "");
      cookieStore.delete("myToken");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return NextResponse.json(error.message, { status: 500 });
      }
      return NextResponse.json(error, { status: 500 });
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}
