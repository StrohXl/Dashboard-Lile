import { tokenValidator } from "@/app/validators/token.validator";
import { getParams } from "@/utils/getParams";
import { NextRequest, NextResponse } from "next/server";

import { createSale, getSales } from "./services";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const params = getParams({ request });
  return await getSales({ params });
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
