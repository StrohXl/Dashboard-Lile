import { NextRequest } from "next/server";
import { loginUser } from "./services";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return loginUser(body);
}
