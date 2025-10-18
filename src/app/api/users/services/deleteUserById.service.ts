import { User } from "@prisma/client";
import { NextResponse } from "next/server";

import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";

export async function deleteUserById({
  id,
}: {
  id: number;
}): ResponseService<User> {
  try {
    const deleteUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json({
      data: deleteUser,
      message: "Usuario Eliminado",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Error" },
      { status: 500 }
    );
  }
}
