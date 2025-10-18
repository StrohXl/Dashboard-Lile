import { Roles } from "@prisma/client";

export interface Token {
  id: number;
  role: Roles;
}
