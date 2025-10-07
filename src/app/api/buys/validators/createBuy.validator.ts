import { z, ZodError } from "zod";

import { createProductSchema } from "../../products/validators/product.validator";

const productsBuySchema = createProductSchema
  .extend({
    id: z.number(),
    selling_price: z.number().min(0.1).positive(),
    purchase_price: z.number().positive(),
  })
  .omit({ price: true });

const createBuySchema = z.object({
  products: z.array(productsBuySchema).nonempty(),
});

export type CreateBuy = z.infer<typeof createBuySchema>;
export type ProductsBuy = z.infer<typeof productsBuySchema>;

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
