import prisma from "@/libs/prisma";
import UrlParams from "@/models/url-params.model";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export const getClients = async ({
  page = undefined,
  name = undefined,
  all = "false",
  ci = undefined,
}: UrlParams) => {
  if (all == "true") {
    const clients = await prisma.clients.findMany({
      include: {
        sales: true,
      },
      where: {
        name: name
          ? {
              contains: name,
            }
          : {},
        ci: ci
          ? {
              equals: Number(ci),
            }
          : {},
      },
    });
    return NextResponse.json({ data: clients, pages: 0 });
  }
  const { elementsPerPage, pages } = await getPages("/clients");
  const clients = await prisma.clients.findMany({
    skip: Number(page) && (Number(page) - 1) * elementsPerPage,
    take: elementsPerPage,
    include: {
      sales: true,
    },
    where: {
      name: name
        ? {
            contains: name,
          }
        : {},
      ci: ci
        ? {
            equals: Number(ci),
          }
        : {},
    },
  });
  return NextResponse.json({ data: clients, pages });
};
