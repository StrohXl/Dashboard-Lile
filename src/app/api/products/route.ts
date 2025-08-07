import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts, validToken } from "./services";

export async function GET(request: NextRequest) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const page = searchParams.get("page");

  return await getProducts({ name, page: Number(page) });
}
export async function POST(request: NextRequest) {
  const token = await validToken(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const body = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);
  return await createProduct(body, token);
}
