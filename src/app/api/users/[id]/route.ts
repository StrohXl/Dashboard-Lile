import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import { deleteUserById, getUserById } from "../services";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const { id } = await params;
  return await getUserById(Number(id));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const token = await tokenValidator(req);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }
  const { id } = await params;

  return await deleteUserById({ id: Number(id) });
}

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
