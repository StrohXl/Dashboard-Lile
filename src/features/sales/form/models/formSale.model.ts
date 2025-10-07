import { CreateListProduct } from "@/app/api/list-products/validators/createListProduct.validator";
import { CreatePaymentOfSale } from "@/app/api/sales/models";
import { UpdateChangeManager } from "@/models/change_manager";

export interface FormSale {
  client: {
    id: number;
    ci: string;
    name: string;
    last_name: string;
  };
  list_products: CreateListProduct;
  payments: CreatePaymentOfSale[];
  change_manager: UpdateChangeManager[];
}
