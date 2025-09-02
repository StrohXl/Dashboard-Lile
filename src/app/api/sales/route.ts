import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";
import { createSale, getSales } from "./services";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const all = searchParams.get("all") ?? "false";
  const page = searchParams.get("page");

  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  return await getSales({ all, page: Number(page) });
}

export async function POST(request: NextRequest) {
  const token = tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const body = await request.json();

  return await createSale(body);
}
