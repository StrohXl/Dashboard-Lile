import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prisma";
import TypeUser from "./type/typeUser";
import validInputs from "./utils/validInputs";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export async function getUser() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function getUserId(id: number) {
  try {
    const userId = await prisma.user.findUnique({ where: { id } });
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function createUser(body: TypeUser) {
  const { email, password } = body;
  const result = validInputs(body);
  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        password,
        email,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function deleteUserId(id: number) {
  try {
    const userId = await prisma.user.findUnique({ where: { id } });
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function updateUserId(body: TypeUser, id: number) {
  const { email, password } = body;
  try {
    const userUpdate = await prisma.user.update({
      data: {
        password,
        email,
      },
      where: { id },
    });
    return NextResponse.json(userUpdate);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
