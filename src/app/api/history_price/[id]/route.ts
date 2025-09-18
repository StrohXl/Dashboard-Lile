import { NextRequest, NextResponse } from "next/server";
import { getHistoryPriceById } from "../services/getHistoryPriceById";
import { deleteHistoryPriceById } from "../services/deleteHistoryPriceById";
import { tokenValidator } from "@/app/validators/token.validator";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;
  return await getHistoryPriceById({ id: Number(id) });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;
  return await deleteHistoryPriceById({ id: Number(id) });
}
