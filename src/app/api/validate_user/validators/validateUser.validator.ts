import z, { ZodError } from "zod";
import { ValidateUserModel } from "../model/validateUser.model";

export const validateUserSchema = z.object({
  email: z.email(),
  token: z.string().min(6),
});

export function validateUserValidator(
  body: ValidateUserModel
): ValidateUserModel | ZodError {
  try {
    return validateUserSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) return error;
    throw error;
  }
}
