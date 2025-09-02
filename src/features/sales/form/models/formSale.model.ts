export interface FormSale {
  client: {
    id: number;
    name: string;
    last_name: string;
  };
  list_products: {
    id: number;
    name: string;
    price: number;
    stock: number;
    unit: "unit" | "kg" | "package";
  }[];
  payments: {
    payment_method: "efectivo Bs" | "divisa" | "transferencia";
    payment_amount: number;
    operation?: number | undefined;
  }[];
  change_manager: {
    payment_method: "efectivo Bs" | "divisa" | "transferencia";
    payment_amount: number;
    operation?: number | undefined;
  }[];
}
