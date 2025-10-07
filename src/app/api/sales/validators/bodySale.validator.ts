import { z, ZodError } from "zod";

import { createChangeSchema } from "../../change_manager/validators/createChange.validator";
import { createClientSchema } from "../../clients/validators";
import { createListProductSchema } from "../../list-products/validators/createListProduct.validator";
import { createPaymentSchema } from "../../payments/validators/createPayment.validator";

const createSaleSchema = z
  .object({
    client: createClientSchema.extend({
      id: z.number().min(0),
    }),
    list_products: createListProductSchema,
    payments: z.array(createPaymentSchema.omit({ sales_id: true })).optional(),
    change_manager: z
      .array(createChangeSchema.omit({ sale_id:true }))
      .optional(),
  })
  .strict();

export type CreateSale = z.infer<typeof createSaleSchema>;

export default function saleBodyValidator(
  body: CreateSale
): CreateSale | ZodError {
  try {
    return createSaleSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
