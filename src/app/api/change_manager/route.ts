import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";
import { getChanges } from "./services/getChanges.service";
import { createChange } from "./services/createChange.service";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const searchParams = request.nextUrl.searchParams;

  const all = searchParams.get("all") ?? "false";
  const name = searchParams.get("name") ?? "";
  const page = searchParams.get("page") ?? 1;
  const params = { all, name, page: Number(page) };
  return await getChanges({ params: params });
}

export async function POST(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json("Solicitud no permitida", { status: 400 });
  }
  const body = await request.json();
  return await createChange({ body });
}
