import { ChangeManagerCreate } from "@/app/api/change-manager/validators/bodyChange.validator";
import { CreateListProduct } from "@/app/api/list-products/validators/createListProduct.validator";
import { CreatePaymentOfSale } from "@/app/api/sales/models";

export interface FormSale {
  client: {
    id: number;
    ci: string;
    name: string;
    last_name: string;
  };
  list_products: CreateListProduct;
  payments: CreatePaymentOfSale[];
  change_manager: ChangeManagerCreate[];
}
