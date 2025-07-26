import { NextRequest } from "next/server";
import { deleteProductId, getProductId, updateProductId } from "../services";
import TypeProduct from "../type/typeProducts";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  return await getProductId(Number(id));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  return await deleteProductId(Number(id));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const body: TypeProduct = await req.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);

  return await updateProductId(body, Number(id));
}
