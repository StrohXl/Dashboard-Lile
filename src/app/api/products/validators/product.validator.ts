import { z, ZodError } from "zod";

import { CreateProduct } from "@/models/api/product";

export const createProductSchema = z
  .object({
    name: z.string().min(3).nonempty(),
    price: z.number().min(0).positive(),
    stock: z.number().min(0).positive(),
    unit: z.union([z.literal("unit"), z.literal("kg")]),
    iva: z.boolean(),
  })
  .strict();

export default function productValidator(
  body: CreateProduct
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
