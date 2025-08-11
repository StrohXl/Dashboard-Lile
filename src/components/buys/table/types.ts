import TypeProduct from "@/app/api/products/type/typeProducts";

export type ListProductsType = {
  id?: number;
  name: string;
  stock: number;
  price: number;
  selling_price: number;
};

export interface TableBuysType {
  id: number;
  createdAT: string;
  products: TypeProduct[];
  list_products: ListProductsType[];
  total_price: number;
}
