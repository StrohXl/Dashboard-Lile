import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";
import { getChanges } from "./services/getChanges.service";
import { createChange } from "./services/createChange.service";
import { getParams } from "@/utils/getParams";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const params = getParams({ request });
  return await getChanges({ params: params });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await createChange({ body });
}
