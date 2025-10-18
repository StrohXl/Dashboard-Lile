import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { deleteProducts } from "../services";

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await deleteProducts(body);
}
