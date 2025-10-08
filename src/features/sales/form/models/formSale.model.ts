import { CreatePaymentOfSale } from "@/app/api/sales/models";
import { UpdateChangeManager } from "@/models/api/change_manager";
import { CreateListProduct } from "@/models/api/list_products";

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
