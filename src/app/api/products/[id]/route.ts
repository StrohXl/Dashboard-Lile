import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "../services";
import { Product } from "@/models/product";

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
  return await getProductById(Number(id));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(request);
  if (!token) {
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
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  const body: Product = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);

  return await updateProductById(body, Number(id));
}
