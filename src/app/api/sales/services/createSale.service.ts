import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { calculateTotalPrice } from "@/utils";
import { Prisma, Sales } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateSale } from "@/models/api/sale";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { updateStockProducts } from "../../products/services";
import { calculateTotalPayments } from "../utilities";
import { calculateTotalChanges } from "../utilities/calculateTotalChanges.utility";
import { getDebt } from "../utilities/getDebt.utility";
import saleBodyValidator from "../validators/bodySale.validator";
import { Token } from "@/models/token";

export async function createSale({
  body,
  token,
}: {
  body: CreateSale;
  token: Token;
}): ResponseService<Sales> {
  const validatorBody = saleBodyValidator(body);

  if (validatorBody instanceof ZodError) {
    console.error(validatorBody);
    return NextResponse.json(
      { message: "Hubo un error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
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

    const debt = getDebt({ totalPayments, totalPrice });
    const turned =
      totalPayments > totalPrice &&
      Number((totalPayments - totalPrice).toFixed(2));
    const listProducts = body.list_products;

    const math = Number(
      Math.abs(totalChanges - totalPayments).toExponential(2)
    );

    const status = math - totalPrice == 0 ? "completed" : "pending";

    if (totalPayments > totalPrice && turned !== totalChanges) {
      return NextResponse.json(
        { message: "Error en el cambio entregado", status: 400 },
        { status: 400 }
      );
    }

    const sale = await prisma.sales.create({
      data: {
        status,
        debt,
        total_price: totalPrice,
        list_products: {
          create: listProducts.map((item) => ({
            name: item.name,
            stock: item.stock,
            price: item.price,
            unit: item.unit,
          })),
        },
        payments: {
          create: body.payments?.map((item) => ({
            payment_amount: item.payment_amount,
            payment_method: item.payment_method,
            operation: item.operation,
            User: {
              connect: { id: token.id },
            },
          })),
        },
        client:
          body.client.id == 0
            ? {
                create: {
                  name: body.client.name,
                  last_name: body.client.last_name,
                  ci: body.client.ci,
                },
              }
            : {
                connect: { id: body.client.id },
              },
        change_manager: {
          create: body.change_manager?.map((item) => ({
            change_amount: item.change_amount,
            change_method: item.change_method,
            operation: item.operation,
            User: {
              connect: { id: token.id },
            },
          })),
        },
        products: {
          connect: body.list_products.map((item) => ({ id: item.id })),
        },
        User: {
          connect: { id: token.id },
        },
      },
    });

    await updateStockProducts({
      action: "decrement",
      products: body.list_products,
    });
    return NextResponse.json({
      message: "Venta creada",
      status: 200,
      data: sale,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Uno de los productos no existe", status: 404 },
          {
            status: 404,
          }
        );
      } else if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Ya existe un Cliente con esa Cedula", status: 404 },
          {
            status: 404,
          }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
