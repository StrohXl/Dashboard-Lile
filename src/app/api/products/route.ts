import { NextRequest } from "next/server";
import { createProduct, getProductName, getProducts } from "./services";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const page = searchParams.get("page");

  if (name && name != "") {
    return await getProductName({ name, page: Number(page) });
  } else {
    return await getProducts({ page: Number(page) });
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  body.price = Number(body.price);
  body.stock = Number(body.stock);
  return await createProduct(body);
}
