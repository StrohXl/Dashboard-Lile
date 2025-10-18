import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/prisma";
import { calculateTotalPayments } from "../../sales/utilities";
import getPyDollar from "@/fetch/pydolar/getPyDolar";

export async function GET(request: NextRequest) {
  const token = await tokenValidator(request);
  if (!token) {
    return NextResponse.json(
      { error: "Solicitud no permitida" },
      { status: 400 }
    );
  }

  const hoy = new Date();
  const start = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const end = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);

  const dollar = (await getPyDollar()) ?? 0;

  try {
    const changes = await prisma.changeManager.findMany({
      where: {
        userId: token.id,
        created_at: {
          gte: start,
          lt: end,
        },
      },
    });

    const totalChanges = calculateTotalPayments({
      payments: changes.map((item) => ({
        payment_method: item.change_method,
        payment_amount: Number(item.change_amount),
        sales_id: item.sale_id,
        operation: item.operation,
      })),
      dollar,
    });

    return NextResponse.json({ count: totalChanges });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
