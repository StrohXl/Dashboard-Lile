import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "xaviermayora20@gmail.com",
    password: "$2b$08$Flaqa4jE/SalGSbbcOzG4.opU2FQ4HuDU2sojOYS/wZrcRF89NuRW",
    name: "Xavier",
    last_name: "Mayora",
    role: "ADMIN",
    verified: true,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
