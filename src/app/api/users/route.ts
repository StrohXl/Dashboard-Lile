import { getUser } from "./services";

export async function GET() {
  return await getUser();
}
