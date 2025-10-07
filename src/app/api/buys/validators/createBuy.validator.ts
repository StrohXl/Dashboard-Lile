import { z, ZodError } from "zod";

import { createProductSchema } from "../../products/validators/product.validator";
import { CreateBuy } from "@/models/buy";

export const createBuyProductsSchema = createProductSchema
  .extend({
    id: z.number(),
    selling_price: z.number().min(0.1).positive(),
    purchase_price: z.number().positive(),
  })
  .omit({ price: true });

export const createBuySchema = z.object({
  products: z.array(createBuyProductsSchema).nonempty(),
});

export default function createBuyValidator(
  body: CreateBuy
): CreateBuy | ZodError {
  try {
    return createBuySchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
