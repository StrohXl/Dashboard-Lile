import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../../products/services";
import { deleteBuys } from "../services";

export async function POST(request: NextRequest) {
  const token = validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await deleteBuys(body);
}
