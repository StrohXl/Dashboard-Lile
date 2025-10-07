import { z, ZodError } from "zod";

import { Product } from "../models";

export const createProductSchema = z
  .object({
    name: z.string().min(3).nonempty(),
    price: z.number().min(0).positive(),
    stock: z.number().min(1).positive(),
    unit: z.union([z.literal("unit"), z.literal("kg")]),
    iva: z.boolean(),
  })
  .strict();

export type CreateProduct = z.infer<typeof createProductSchema>;

export default function productValidator(
  body: Product
): CreateProduct | ZodError {
  try {
    return createProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
