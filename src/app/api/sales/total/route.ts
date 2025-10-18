import { tokenValidator } from "@/app/validators/token.validator";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

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

  try {
    const totalSales = await prisma.sales.count({
      where: {
        userId: token.id,
        created_at: {
          gte: start,
          lt: end,
        },
      },
    });

    return NextResponse.json({ count: totalSales });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
