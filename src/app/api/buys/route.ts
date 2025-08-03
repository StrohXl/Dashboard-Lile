import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../products/services";
import { createBuy, getBuys } from "./services";

export async function GET(request: NextRequest) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  return await getBuys(request);
}

export async function POST(request: NextRequest) {
  const token = await validToken(request);
  const body = await request.json();
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  return await createBuy(body, token);
}
