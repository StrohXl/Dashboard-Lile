import { NextRequest, NextResponse } from "next/server";
import { tokenValidator } from "@/app/validators/token.validator";
import { deleteSales } from "../services";

export async function POST(request: NextRequest) {
  const token = tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await deleteSales(body);
}
