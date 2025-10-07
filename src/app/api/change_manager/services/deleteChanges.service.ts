import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function deleteChanges(body: number[]) {
  try {
    await prisma.changeManager.deleteMany({
      where: {
        id: {
          in: body,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
