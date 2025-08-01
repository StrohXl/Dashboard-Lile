import { NextRequest } from "next/server";
import { logoutUser } from "./services";

export async function GET(request: NextRequest) {
  return await logoutUser(request);
}
