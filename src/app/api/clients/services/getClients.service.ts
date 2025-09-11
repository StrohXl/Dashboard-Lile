import prisma from "@/libs/prisma";
import { ParamsRequest } from "@/models";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export const getClients = async ({ params }: { params: ParamsRequest }) => {
  const { ci, name } = params;

  if (ci) {

    const clients = await prisma.clients.findMany({
      include: {
        sales: true,
      },
      where: {
        ci: {
          equals: Number(ci),
        },
      },
    });
    return NextResponse.json({ data: clients, pages: 0 });
    
  }

  const { skip, take, pages } = await getPages("/clients", params);

  const clients = await prisma.clients.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    skip,
    take,
  });
  return NextResponse.json({ data: clients, pages });
};
