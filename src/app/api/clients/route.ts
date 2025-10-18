import { tokenValidator } from "@/app/validators/token.validator";
import { getParams } from "@/utils/getParams";
import { NextRequest, NextResponse } from "next/server";

import { createClient, getClients } from "./services";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { message: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const params = getParams({ request });
  return await getClients({
    params,
    token,
  });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json(
      { message: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const body = await request.json();
  return await createClient({ body, token });
}
