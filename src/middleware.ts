import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("myToken");
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
