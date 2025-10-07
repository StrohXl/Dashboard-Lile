import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { deleteChanges } from "../services/deleteChanges.service";

export async function POST(request: NextRequest) {
  const token = tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await deleteChanges(body);
}
