import { tokenValidator } from "@/app/validators/token.validator";
import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { calculateTotalPayments } from "../../sales/utilities";

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
    const payments = await prisma.payments.findMany({
      where: {
        userId: token.id,
        created_at: {
          gte: start,
          lt: end,
        },
      },
    });

    const totalPayments = calculateTotalPayments({
      payments: payments.map((item) => ({
        payment_method: item.payment_method,
        payment_amount: Number(item.payment_amount),
        sales_id: item.sales_id,
        operation: item.operation,
      })),
      dollar,
    });

    return NextResponse.json({ count: totalPayments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
