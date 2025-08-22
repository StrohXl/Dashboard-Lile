import { NextResponse } from "next/server";
import saleBodyValidator, {
  CreateSale,
} from "../validators/bodySale.validator";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client/edge";
import { createSaleAndCreateClient } from "./createSaleAndCreateClient.service";
import { createSaleByIdClient } from "./createSaleByIdClient.service";
import { updateStockProducts } from "../../products/services";

export async function createSale(body: CreateSale) {
  const validatorBody = saleBodyValidator(body);
  if (validatorBody instanceof ZodError) {
    return NextResponse.json("Hubo un error en la solicitud", { status: 400 });
  }
  try {
    if (body.id_client && body.id_client !== 0) {
      const sale = await createSaleByIdClient(body);
      await updateStockProducts({
        action: "decrement",
        products: body.list_products,
      });
      return NextResponse.json(sale);
    }
    if (body.new_client) {
      const sale = await createSaleAndCreateClient(body);
      await updateStockProducts({
        action: "decrement",
        products: body.list_products,
      });
      return NextResponse.json(sale);
    }

    return NextResponse.json("Hubo un error en la solicitud", {
      status: 400,
    });
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
