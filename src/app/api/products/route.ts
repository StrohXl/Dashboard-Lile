import { tokenValidator } from "@/app/validators/token.validator";
import { getParams } from "@/utils/getParams";
import { NextRequest, NextResponse } from "next/server";

import { createProduct, getProducts } from "./services";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);

  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const params = getParams({ request });

  return await getProducts({ params, token });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const body = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);
  return await createProduct(body, token);
}
