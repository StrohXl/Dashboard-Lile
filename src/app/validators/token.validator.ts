import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../libs/prisma";

export async function tokenValidator(request: NextRequest) {
  const token = request.cookies.get("myToken");
  const key = process.env.JWT_KEY || "";
  if (token) {
    try {
      const { id } = jwt.verify(token.value, key) as { id: number };
      const blackListToken = await prisma.blackListToken.findUnique({
        where: {
          id,
          token: token.value,
        },
      });
      if (blackListToken) {
        return false;
      } else {
        return id;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
