import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const getClients = async ({
  page,
  elementsPerPage,
  name,
}: {
  page: number;
  elementsPerPage: number;
  name: string;
}) => {
  const clients = await prisma.clients.findMany({
    skip: (page - 1) * elementsPerPage,
    take: elementsPerPage,
    where: {
      name: {
        contains: name,
      },
    },
  });
  return NextResponse.json(clients);
};
