import { z, ZodError } from "zod";

import { CreateSale } from "@/models/api/sale/createSale.model";

import { createChangeSchema } from "../../change_manager/validators/createChange.validator";
import { createClientSchema } from "../../clients/validators";
import { createListProductSchema } from "../../list-products/validators/createListProduct.validator";
import { createPaymentSchema } from "../../payments/validators/createPayment.validator";

export const createSaleSchema = z
  .object({
    client: createClientSchema.extend({
      id: z.number().min(0),
    }),
    list_products: createListProductSchema,
    payments: z
      .array(
        createPaymentSchema.omit({ sales_id: true }).extend({ id: z.number() })
      )
      .optional(),
    change_manager: z
      .array(
        createChangeSchema.omit({ sale_id: true }).extend({ id: z.number() })
      )
      .optional(),
  })
  .strict();

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
