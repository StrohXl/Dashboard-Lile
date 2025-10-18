import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import prisma from "../../../libs/prisma";
import { Token } from "@/models/token";

export async function tokenValidator(request: NextRequest) {
  const token = request.cookies.get("myToken");
  const key = process.env.JWT_KEY || "";
  if (token) {
    try {
      const { id, role } = jwt.verify(token.value, key) as Token;
      const blackListToken = await prisma.blackListToken.findUnique({
        where: {
          id,
          token: token.value,
        },
      });
      if (blackListToken) {
        return false;
      } else {
        return { id, role };
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
