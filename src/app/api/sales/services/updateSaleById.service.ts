import { NextResponse } from "next/server";
import { CreateSale } from "../validators/bodySale.validator";

export async function updateSaleById({
  id,
  body,
}: {
  body: CreateSale;
  id: number;
}) {
  return NextResponse.json({ id, body });
}
