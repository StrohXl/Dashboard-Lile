import { NextRequest } from "next/server";
import { validateUser } from "./services/validateUser.service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return await validateUser(body);
}
