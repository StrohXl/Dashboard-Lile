import prisma from "@/libs/prisma";
import UrlParams from "@/models/url-params.model";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export const getClients = async ({
  page = undefined,
  name = "",
  all = "false",
  ci = undefined,
}: UrlParams) => {
  if (all == "true") {
    const clients = await prisma.clients.findMany({
      include: {
        sales: true,
      },
    });
    return NextResponse.json({ data: clients, pages: 0 });
  } else if (ci) {
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
  const { elementsPerPage, pages } = await getPages("/clients");
  const clients = await prisma.clients.findMany({
    skip: (Number(page) - 1) * elementsPerPage,
    take: elementsPerPage,
    include: {
      sales: true,
    },
    where: {
      name: {
        contains: name,
      },
    },
  });
  return NextResponse.json({ data: clients, pages });
};
