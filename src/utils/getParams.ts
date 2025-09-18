import { NextRequest } from "next/server";

export function getParams({ request }: { request: NextRequest }) {
  const searchParams = request.nextUrl.searchParams;
  const all = searchParams.get("all") ?? "false";
  const name = searchParams.get("name") ?? "";
  const page = searchParams.get("page") ?? 1;
  const ci = searchParams.get("ci");
  const params = {
    all,
    name,
    page: Number(page),
    ci: ci == null ? null : Number(ci),
  };
  return params;
}
