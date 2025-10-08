import z from "zod";
import { createSaleSchema } from ".";
import { UpdateSale } from "@/models/api/sale/updateSale.model";
import { createPaymentSchema } from "../../payments/validators/createPayment.validator";
import { createChangeSchema } from "../../change_manager/validators/createChange.validator";

export const updateSaleSchema = createSaleSchema
  .omit({
    client: true,
    list_products: true,
  })
  .extend({
    payments: z.array(
      createPaymentSchema.extend({ id: z.number() }).omit({ sales_id: true })
    ),
    change_manager: z.array(
      createChangeSchema.extend({ id: z.number() }).omit({ sale_id: true })
    ),
  });

export function updateBodySaleValidator(body: UpdateSale) {
  try {
    const validBody = updateSaleSchema.parse(body);
    return validBody;
  } catch (error) {
    return error;
  }
}
