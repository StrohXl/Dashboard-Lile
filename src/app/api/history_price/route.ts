import { tokenValidator } from "@/app/validators/token.validator";
import { getParams } from "@/utils/getParams";
import { NextRequest, NextResponse } from "next/server";

import { getHistoryPrice } from "./services/getHistoryPrice";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const params = getParams({ request });
  return await getHistoryPrice({params});
}
