import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { calculateTotalPrice } from "@/utils";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateSale } from "@/models/api/sale";

import prisma from "../../../../../libs/prisma";
import { updateStockProducts } from "../../products/services";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { calculateTotalChanges } from "../utilities/calculateTotalChanges.utility";
import { getDebt } from "../utilities/getDebt.utility";
import saleBodyValidator from "../validators/bodySale.validator";

export async function createSale(body: CreateSale) {
  const validatorBody = saleBodyValidator(body);

  if (validatorBody instanceof ZodError) {
    console.error(validatorBody);
    return NextResponse.json("Hubo un error en el cuerpo de la solicitud", {
      status: 400,
    });
  }

  const dollar = (await getPyDollar()) ?? 0;

  try {
    const totalChanges = Number(
      calculateTotalChanges({
        changes: body.change_manager ?? [],
        dollar,
      }).toFixed(2)
    );

    const totalPayments = Number(
      calculateTotalPayments({
        dollar,
        payments: body.payments,
      }).toFixed(2)
    );

    const totalPrice = Number(
      calculateTotalPrice(body.list_products).toFixed(2)
    );

    const status = getSaleStatus({ totalPayments, totalPrice });
    const debt = getDebt({ totalPayments, totalPrice });
    const turned =
      totalPayments > totalPrice &&
      Number((totalPayments - totalPrice).toFixed(2));
    const listProducts = body.list_products;

    if (totalPayments > totalPrice && turned !== totalChanges) {
      console.log({ turned, totalChanges });
      return NextResponse.json("Error en el cambio entregado", { status: 400 });
    }

    if (body.client.id == 0) {
      await prisma.sales.create({
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
          client: {
            create: {
              name: body.client.name,
              last_name: body.client.last_name,
              ci: body.client.ci,
            },
          },
          change_manager: {
            create: body.change_manager,
          },
          products: {
            connect: body.list_products.map((item) => ({ id: item.id })),
          },
        },
      });
    } else if (body.client.id !== 0) {
      await prisma.sales.create({
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
          client: {
            connect: { id: body.client.id },
          },
          change_manager: {
            create: body.change_manager,
          },
          products: {
            connect: body.list_products.map((item) => ({ id: item.id })),
          },
        },
      });
    }

    await updateStockProducts({
      action: "decrement",
      products: body.list_products,
    });

    return NextResponse.json("Venta creada");
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
