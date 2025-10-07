import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { deleteChangeById } from "../services/deleteChangeById.service";
import { getChangeById } from "../services/getChangeById.service";

type Params = Promise<{
  id: string;
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;
  return await getChangeById(Number(id));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;
  
  return await deleteChangeById(Number(id));
}
