import { createSaleSchema } from ".";
import { UpdateSale } from "@/models/api/sale/updateSale.model";

export const updateSaleSchema = createSaleSchema.omit({
  client: true,
  list_products: true,
});

export function updateBodySaleValidator(body: UpdateSale) {
  try {
    const validBody = updateSaleSchema.parse(body);
    return validBody;
  } catch (error) {
    return error;
  }
}
