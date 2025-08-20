import prisma from "@/libs/prisma";
import { getPages } from "@/utils/get-pages.utility";
import { NextResponse } from "next/server";

export const getClients = async ({
  page,
  name,
}: {
  page: number;
  name: string;
}) => {
  const { elementsPerPage, pages } = await getPages("clients");
  const clients = await prisma.clients.findMany({
    skip: (page - 1) * elementsPerPage,
    take: elementsPerPage,
    where: {
      name: {
        contains: name,
      },
    },
  });
  return NextResponse.json({ data: clients, pages });
};
