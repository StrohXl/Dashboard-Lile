import prisma from "@/libs/prisma";

export const getPagesBuys = async (elementsPerPage: number) => {
  const counts = await prisma.buys.count();
  let pages = counts / elementsPerPage;
  pages = Math.ceil(pages);
  return pages;
};
