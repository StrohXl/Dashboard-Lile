import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { deleteBuyById, getBuyById } from "../services";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { message: "Solicitud no permitida" },
      { status: 400 }
    );
  }

  const { id } = await params;
  return await getBuyById({ id: Number(id), token });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json(
      { message: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const { id } = await params;

  return await deleteBuyById(Number(id));
}
