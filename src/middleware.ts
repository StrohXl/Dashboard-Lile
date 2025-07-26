import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const cookies = request.cookies;
  const token = cookies.get("myToken");
  if (!token && url !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (url === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
