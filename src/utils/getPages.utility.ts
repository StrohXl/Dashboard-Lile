import prisma from "@/libs/prisma";
import { ApiUrl, ParamsRequest } from "@/models";

interface Pages {
  pages: number;
  take: number;
  skip: number;
}

export async function getPages(
  model: ApiUrl,
  params: ParamsRequest
): Promise<Pages> {
  const elementsPerPage: number = 10;

  const { all, page = 1 } = params;

  const take = elementsPerPage;
  const skip =
    all && all == "true"
      ? 0
      : Number(page) == 1
      ? 1
      : elementsPerPage * (Number(page) - 1);

  if (model === "/buys") {
    const counts = await prisma.buys.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  } else if (model === "/clients") {
    const counts = await prisma.clients.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  } else if (model === "/products") {
    const counts = await prisma.products.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  } else if (model === "/payments") {
    const counts = await prisma.payments.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  } else if (model === "/sales") {
    const counts = await prisma.sales.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  } else if (model === "/change_manager") {
    const counts = await prisma.changeManager.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, take, skip };
  }
  return {
    take,
    pages: 1,
    skip,
  };
}
