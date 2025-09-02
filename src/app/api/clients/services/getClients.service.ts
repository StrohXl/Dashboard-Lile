import prisma from "@/libs/prisma";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export const getClients = async ({
  page,
  name,
}: {
  page: number;
  name: string;
}) => {
  const { elementsPerPage, pages } = await getPages("/clients");
  const clients = await prisma.clients.findMany({
    skip: (page - 1) * elementsPerPage,
    take: elementsPerPage,
    include:{
      sales:true
    },
    where: {
      name: {
        contains: name,
      },
    },
  });
  return NextResponse.json({ data: clients, pages });
};
