import { NextRequest, NextResponse } from "next/server";
import { tokenValidator } from "@/app/validators/token.validator";
import { createClient, getClients } from "./services";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? undefined;
  const name = searchParams.get("name") ?? undefined;
  const all = searchParams.get("all") ?? "false";
  const ci = searchParams.get("ci") ?? undefined;
  return await getClients({ page, name, ci, all });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await createClient({ body });
}
