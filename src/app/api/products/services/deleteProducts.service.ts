import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function deleteProducts(products: number[]) {
  try {
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
    return NextResponse.json("Error", { status: 500 });
  }
}
