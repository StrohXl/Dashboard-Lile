import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import TypeProduct from "./type/typeProducts";
import validInputs from "./utils/validInputs";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
const prisma = new PrismaClient();

const elementsPerPage = 10;

export async function getProducts({ page }: { page: number }) {
  const products = await prisma.products.findMany({
    orderBy: { id: "desc" },
    skip: page == 0 ? page : (page - 1) * elementsPerPage,
    take: elementsPerPage,
  });
  const counts = await prisma.products.count();
  let pages = counts / elementsPerPage;
  pages = Math.ceil(pages);

  return NextResponse.json({ products: products, pages: pages });
}

export async function getProductId(id: number) {
  try {
    const productId = await prisma.products.findUnique({ where: { id } });
    if (!productId) {
      return NextResponse.json(
        "El Producto no existe",
        { status: 404 }
      );
    }
    return NextResponse.json(productId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function getProductName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  try {
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: page == 0 ? page : (page - 1) * elementsPerPage,
      take: elementsPerPage,
    });
    const counts = await prisma.products.count();
    let pages = counts / elementsPerPage;
    pages = Math.ceil(pages);

    return NextResponse.json({ products, pages: pages });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function createProduct(body: TypeProduct, id: number) {
  const result = validInputs(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }

  const { name, price, stock } = body;
  try {
    await prisma.products.create({
      data: { name, stock, price, userId: id },
    });
    return NextResponse.json({ message: "Producto  Creado" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2002") {
        return NextResponse.json("Un producto ya tiene ese nombre", {
          status: 400,
        });
      }
    } else {
      return NextResponse.json(error, { status: 500 });
    }
  }
}

export async function deleteProductId(id: number) {
  try {
    await prisma.products.delete({ where: { id } });
    return NextResponse.json({ message: "Producto Eliminado" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "El Producto no pudo ser encontrado" },
          { status: 404 }
        );
      } else {
        return NextResponse.json("Error", { status: 500 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function updateProductId(body: TypeProduct, id: number) {
  const result = validInputs(body);
  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }
  const { name, price, stock } = body;
  try {
    const productUpdate = await prisma.products.update({
      data: {
        name,
        price,
        stock,
      },
      where: { id },
    });
    return NextResponse.json(productUpdate);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("El Producto no existe", { status: 404 });
      } else {
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function deleteProducts(products: number[]) {
  try {
    for (let index = 0; index < products.length; index++) {
      const product = await prisma.products.findUnique({
        where: { id: products[index] },
      });
      if (!product) {
        return NextResponse.json("El Producto no existe", { status: 404 });
      }
    }
    await prisma.products.deleteMany({
      where: {
        id: {
          in: products,
        },
      },
    });
    return NextResponse.json({ message: "Productos Eliminados" });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("El Producto no existe", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function validToken(request: NextRequest) {
  const token = request.cookies.get("myToken");
  const key = process.env.JWT_KEY || "";
  if (!token) {
    return false;
  }
  try {
    const { id } = jwt.verify(token.value, key) as { id: number };
    const blackListToken = await prisma.blackListToken.findUnique({
      where: {
        id,
        token: token.value,
      },
    });
    if (blackListToken) {
      return false;
    } else {
      return id;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
