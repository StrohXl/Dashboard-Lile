import { z, ZodError } from "zod";

import { CreateListProduct } from "@/models/api/list_products";

import { createProductSchema } from "../../products/validators/product.validator";

export const createListProductSchema = z
  .array(
    createProductSchema.omit({ iva: true }).extend({
      id: z.number(),
      iva: z.boolean().optional(),
    })
  )
  .nonempty();

export default function createListProductValidator(
  body: CreateListProduct
): CreateListProduct | ZodError {
  try {
    return createListProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
