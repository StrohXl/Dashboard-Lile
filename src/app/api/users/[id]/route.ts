import { NextRequest } from "next/server";

import { getUserId } from "../services";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  return await getUserId(Number(id));
}

/* export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  return await deleteUserId(Number(id));
}
*/
/*
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const body = await request.json();
  return await updateUserId(body, Number(id));
}
  */
