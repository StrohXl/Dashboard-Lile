import { createUserSchema } from "@/app/api/users/validators/createUser.validator";
import z from "zod";

export type CreateUser = z.infer<typeof createUserSchema>;
