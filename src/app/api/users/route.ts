import { NextRequest } from "next/server";
import { createUser, getUser } from "./services";

export async function GET(request: NextRequest) {
  return await getUser();
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  return await createUser(body);
}
