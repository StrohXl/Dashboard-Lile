import { NextRequest, NextResponse } from "next/server";
import { getBuys, createBuy } from "./services";
import { tokenValidator } from "@/app/validators/token.validator";

const elementsPerPage = 10;

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? 1;

  return await getBuys({ page: Number(page), elementsPerPage });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await createBuy(body, token);
}
