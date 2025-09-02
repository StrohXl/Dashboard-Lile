import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";
import { getPayments, createPayment } from "./services";

export async function GET(request: NextRequest) {
  const token = tokenValidator(request);
  const searchParams = request.nextUrl.searchParams;
  const all = searchParams.get("all") ?? "false";
  const page = searchParams.get("page");

  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  return await getPayments({ all, page: Number(page) });
}

export async function POST(request: NextRequest) {
  const token = tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const body = await request.json();

  return await createPayment(body);
}
