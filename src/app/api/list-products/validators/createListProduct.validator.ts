import { z, ZodError } from "zod";

import { CreateListProduct } from "@/models/api/list_products";

import { createProductSchema } from "../../products/validators/product.validator";

export const createListProductSchema = z
  .array(
    createProductSchema
      .extend({
        id: z.number(),
      })
      .omit({ iva: true })
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
