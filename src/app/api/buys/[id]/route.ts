import { NextRequest, NextResponse } from "next/server";
import { deleteBuyById, getBuyById } from "../services";
import { validToken } from "../../products/services";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  return await getBuyById(Number(id));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;

  return await deleteBuyById(Number(id));
}
