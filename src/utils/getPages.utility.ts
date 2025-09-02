import prisma from "@/libs/prisma";
import { ApiUrl } from "@/models";

interface Pages {
  pages: number;
  elementsPerPage: number;
}

export async function getPages(model: ApiUrl): Promise<Pages> {
  const elementsPerPage: number = 10;

  if (model === "/buys") {
    const counts = await prisma.buys.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "/clients") {
    const counts = await prisma.clients.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "/products") {
    const counts = await prisma.products.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "/payments") {
    const counts = await prisma.payments.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "/sales") {
    const counts = await prisma.sales.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  }
  return {
    elementsPerPage,
    pages: 1,
  };
}
