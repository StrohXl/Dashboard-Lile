import { NextRequest, NextResponse } from "next/server";
import { tokenValidator } from "@/app/validators/token.validator";
import { createClient, getClients } from "./services";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? 1;
  const name = searchParams.get("name") ?? "";
  return await getClients({ page: Number(page), name });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await createClient({ body });
}
