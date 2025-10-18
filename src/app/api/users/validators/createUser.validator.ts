import z, { ZodError } from "zod";

import { CreateUser } from "@/models/api/user/createUser.model";

export const createUserSchema = z
  .object({
    name: z.string().nonempty().min(3),
    last_name: z.string().nonempty().min(3),
    email: z.email().nonempty(),
    password: z.string(),
    token: z.string().min(6).max(6),
  })
  .strip();

export function createUserValidator({
  body,
}: {
  body: CreateUser;
}): CreateUser | ZodError {
  try {
    const bodyValidated = createUserSchema.parse(body);
    return bodyValidated;
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
