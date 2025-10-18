import { User } from "@prisma/client";

import prisma from "../../../../../libs/prisma";

export async function createUnverifiedUser({
  body,
}: {
  body: { email: string; token: string };
}): Promise<User> {
  try {
    return await prisma.$transaction(async (tx) => {
      const findUser = await tx.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (findUser && findUser.verified == false) {
        const userUnverified = await prisma.user.update({
          where: {
            email: body.email,
            verified: false,
          },
          data: {
            token: body.token,
          },
        });
        return userUnverified;
      } else {
        const userUnverified = await prisma.user.create({
          data: {
            email: body.email,
            token: body.token,
            password: "",
          },
        });
        return userUnverified;
      }
    });
  } catch (error) {
    throw error;
  }
}
