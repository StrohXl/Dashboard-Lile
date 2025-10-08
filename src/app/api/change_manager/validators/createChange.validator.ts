import z, { ZodError } from "zod";

import { CreateChangeManager } from "@/models/api/change_manager";

export const createChangeSchema = z
  .object({
    change_method: z.union([
      z.literal("efectivo Bs"),
      z.literal("divisa"),
      z.literal("transferencia"),
    ]),
    change_amount: z.number().positive().min(0.1),
    operation: z
      .number()
      .refine((value) => {
        return value.toString().length >= 4;
      })
      .optional(),
    sale_id: z.number().positive(),
  })
  .strict();

export default function validatedChangeManager(body: CreateChangeManager) {
  try {
    return createChangeSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
