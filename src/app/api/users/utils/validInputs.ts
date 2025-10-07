import { z, ZodError } from "zod";

import TypeUser from "../type/typeUser";

const UserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type TypeZodProduct = z.infer<typeof UserSchema>;

export default function validInputs(body: TypeUser): TypeZodProduct | ZodError {
  try {
    return UserSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
