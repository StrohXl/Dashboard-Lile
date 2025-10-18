import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { Product } from "@/models/api/product";

import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "../services";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  return await getProductById({ id: Number(id), token });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;

  return await deleteProductById(Number(id));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(request);
  if (!token || token.role == "CASHIER") {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  const body: Product = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);

  return await updateProductById({ body, id: Number(id), token });
}
