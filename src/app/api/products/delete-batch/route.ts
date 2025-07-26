import { NextRequest } from "next/server";
import { deleteProducts } from "../services";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return await deleteProducts(body);
}
