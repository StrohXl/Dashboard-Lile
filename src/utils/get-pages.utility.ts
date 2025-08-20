import prisma from "@/libs/prisma";

interface Pages {
  pages: number;
  elementsPerPage: number;
}

export async function getPages(
  model: "clients" | "products" | "buys"
): Promise<Pages> {
  const elementsPerPage: number = 10;

  if (model === "buys") {
    const counts = await prisma.buys.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "clients") {
    const counts = await prisma.clients.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  } else if (model === "products") {
    const counts = await prisma.products.count();
    let pages: number = counts / elementsPerPage;
    pages = Math.ceil(pages);
    return { pages, elementsPerPage };
  }
  return {
    elementsPerPage,
    pages: 1,
  };
}
