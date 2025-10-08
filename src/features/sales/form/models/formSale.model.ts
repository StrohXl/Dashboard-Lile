import { UpdateChangeManager } from "@/models/api/change_manager";
import { CreateListProduct } from "@/models/api/list_products";
import { CreatePaymentOfSale } from "@/models/api/sale";

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
