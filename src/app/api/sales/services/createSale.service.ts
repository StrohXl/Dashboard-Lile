import { NextResponse } from "next/server";
import saleBodyValidator, {
  CreateSale,
} from "../validators/bodySale.validator";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client/edge";
import { updateStockProducts } from "../../products/services";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { calculateTotalPrice } from "@/utils";
import { getDebt } from "../utilities/getDebt.utility";
import { createListProduct } from "../../list-products/adapters";
import prisma from "@/libs/prisma";
import { calculateTotalChanges } from "../utilities/calculateTotalChanges.utility";

export async function createSale(body: CreateSale) {
  const validatorBody = saleBodyValidator(body);
  if (validatorBody instanceof ZodError) {
    return NextResponse.json("Hubo un error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  try {
    const totalChanges = calculateTotalChanges(body.change_manager);
    const totalPayments = calculateTotalPayments(body.payments);
    const totalPrice = calculateTotalPrice(body.list_products);
    const status = getSaleStatus({ totalPayments, totalPrice });
    const debt = getDebt({ totalPayments, totalPrice });
    const listProducts = createListProduct(body.list_products);

    if (
      (totalChanges > 0 && totalPayments - totalChanges != totalPrice) ||
      (totalPayments > totalPrice && totalChanges == 0)
    ) {
      return NextResponse.json("Error en el cambio entregado", { status: 400 });
    }

    const sale = await prisma.sales.create({
      data: {
        status,
        debt,
        total_price: totalPrice,
        list_products: {
          create: listProducts,
        },
        payments: {
          create: body.payments,
        },
        client:
          body.client.id !== 0
            ? {
                create: {
                  name: body.client.name ?? "",
                  last_name: body.client.last_name ?? "",
                },
              }
            : {
                connect: { id: body.client.id },
              },
        products: {
          connect: body.list_products.map((item) => ({ id: item.id })),
        },
      },
    });

    await updateStockProducts({
      action: "decrement",
      products: body.list_products,
    });
    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("Uno de los productos no existe", {
          status: 404,
        });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
