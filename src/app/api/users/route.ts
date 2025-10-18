import { NextRequest } from "next/server";

import { getUsers } from "./services";
import { createUser } from "./services/createUser.service";

export async function GET() {
  return await getUsers();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return await createUser({ body });
}
