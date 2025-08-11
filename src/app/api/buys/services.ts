import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import validInputs from "../products/utils/validInputs";
import { ZodError } from "zod";
import prisma from "@/libs/prisma";
import { TypeProductNew } from "@/components/buys/form/types";
import { ListProductsType } from "@/components/buys/table/types";
import TypeProduct from "../products/type/typeProducts";

const elementsPerPage = 10;

const getPagesBuys = async () => {
  const counts = await prisma.buys.count();
  let pages = counts / elementsPerPage;
  pages = Math.ceil(pages);
  return pages;
};

export async function getBuys(page: number) {
  try {
    const buys = await prisma.buys.findMany({
      include: {
        list_products: true,
        products: true,
        User: true,
      },
      skip: (Number(page) - 1) * elementsPerPage,
      take: elementsPerPage,
      orderBy: { id: "desc" },
      cacheStrategy: { ttl: 2 },
    });
    const pages = await getPagesBuys();
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
      include: { list_products: true },
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

export async function createBuy(body: TypeProductNew[], id: number) {
  for (let index = 0; index < body.length; index++) {
    const result = validInputs(body[index]);
    if (result instanceof ZodError) {
      console.log(result.issues);
      return NextResponse.json(result.issues, { status: 400 });
    }
  }

  const { productsConnect, productsCreate } = createBodyBuy(body);
  const listProducts = createListProducts(body);
  const totalPrice = getTotalPrice(body);
  console.log(totalPrice);
  try {
    await prisma.buys.create({
      data: {
        userId: id,
        products: {
          connect: productsConnect.map((item) => ({ id: item.id })),
          create: productsCreate,
        },
        list_products: {
          create: listProducts,
        },
        total_price: 100,
      },
      include: { products: true },
    });

    await updateProducts(productsConnect);

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
        return NextResponse.json("Uno de los productos no existe", {
          status: 404,
        });
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
      const buy = await prisma.buys.findUnique({
        where: { id: ids[index] },
      });
      if (!buy) {
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

const createListProducts = (body: TypeProductNew[]): ListProductsType[] => {
  const list_products: ListProductsType[] = [];

  body.forEach((item) => {
    list_products.push({
      name: item.name,
      price: item.price,
      stock: item.stock,
      selling_price: item.sellingPrice,
    });
  });
  console.log(body);
  console.log(list_products);
  return list_products;
};

const createBodyBuy = (body: TypeProductNew[]) => {
  const productsConnect: TypeProduct[] = [];
  const productsCreate: TypeProduct[] = [];
  body.forEach((item) => {
    if (item.id !== 0) {
      productsConnect.push({
        name: item.name,
        id: item.id,
        price: item.sellingPrice,
        stock: item.stock,
      });
    } else {
      productsCreate.push({
        name: item.name,
        price: item.sellingPrice,
        stock: item.stock,
      });
    }
  });
  return { productsConnect, productsCreate };
};

const updateProducts = async (productsConnect: TypeProduct[]) => {
  for (let index = 0; index < productsConnect.length; index++) {
    await prisma.products.update({
      where: { id: productsConnect[index].id },
      data: {
        price: productsConnect[index].price,
        stock: {
          increment: Number(productsConnect[index].stock),
        },
      },
    });
  }
};

const getTotalPrice = (body: TypeProductNew[]) => {
  const priceTotal = body.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );
  return priceTotal;
};
