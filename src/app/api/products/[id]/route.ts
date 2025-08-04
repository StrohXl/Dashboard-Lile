import { NextRequest, NextResponse } from "next/server";
import {
  deleteProductId,
  getProductId,
  updateProductId,
  validToken,
} from "../services";
import TypeProduct from "../type/typeProducts";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  return await getProductId(Number(id));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const { id } = await params;

  return await deleteProductId(Number(id));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const { id } = await params;
  const body: TypeProduct = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);

  return await updateProductId(body, Number(id));
}
