import { Decimal } from "@prisma/client/runtime/library";
import { ListProduct } from "../../list-products/models";

export function listProductsAdapter(
  sale: {
    payments: {
      id: number;
      created_at: Date;
      payment_method: string;
      payment_amount: Decimal;
      operation: number;
      sales_id: number | null;
    }[];
    list_products: {
      id: number;
      name: string;
      price: Decimal;
      stock: number;
      createdAT: Date;
      updatedAT: Date;
      buysId: number | null;
      salesId: number | null;
    }[];
  } & {
    id: number;
    total_price: Decimal;
    debt: Decimal;
    status: string;
    id_client: number;
    created_at: Date;
    updated_at: Date;
  }
): ListProduct[] {
  const listProducts: ListProduct[] = sale.list_products.map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    stock: item.stock,
  }));
  return listProducts;
}
