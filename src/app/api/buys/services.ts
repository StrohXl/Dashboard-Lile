import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import TypeProduct from "../products/type/typeProducts";
import validInputs from "../products/utils/validInputs";
import { ZodError } from "zod";

const prisma = new PrismaClient();

const elementsPerPage = 10;

export async function getBuys(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  try {
    const buys = await prisma.buys.findMany({
      include: {
        products: true,
      },
      skip: page ? (Number(page) - 1) * elementsPerPage : 0,
      take: elementsPerPage,
      orderBy: { id: "desc" },
    });
    const counts = await prisma.buys.count();
    let pages = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return NextResponse.json({ data: buys, pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function getBuyById(id: number) {
  try {
    const buy = await prisma.buys.findUnique({
      where: { id: id },
      include: { products: true },
    });
    return NextResponse.json(buy);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function createBuy(body: TypeProduct[], id: number) {
  for (let index = 0; index < body.length; index++) {
    const result = validInputs(body[index]);
    if (result instanceof ZodError) {
      console.log(result.issues);
      return NextResponse.json(result.issues, { status: 400 });
    }
  }

  const productsConnect = body.filter((item) => item.id);
  const productsCreate = body.filter((item) => !item.id);

  try {
    await prisma.buys.create({
      data: {
        userId: id,
        products: {
          connect: productsConnect.map((item) => ({ id: item.id })),
          create: productsCreate,
        },
      },
      include: { products: true },
    });

    for (let index = 0; index < productsConnect.length; index++) {
      await prisma.products.update({
        where: { id: productsConnect[index].id },
        data: productsConnect[index],
      });
    }

    return NextResponse.json(
      `Productos ${productsConnect ? "Actualizados" : "Creados"}`
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json("Ya existe un producto con ese nombre", {
          status: 400,
        });
      }
      if (error.code === "P2025") {
        return NextResponse.json(
          "Uno de los productos no existe",
          {
            status: 404,
          }
        );
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function deleteBuyById(id: number) {
  try {
    await prisma.buys.delete({ where: { id } });
    return NextResponse.json("Compra Eliminada");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function deleteBuys(ids: number[]) {
  try {
    for (let index = 0; index < ids.length; index++) {
      const product = await prisma.buys.findUnique({
        where: { id: ids[index] },
      });
      if (!product) {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    await prisma.buys.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json("Compras Eliminadas");
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
