import TypeProduct from "@/app/api/products/type/typeProducts";

export interface TableBuysType {
  id: number;
  createdAT: string;
  products: TypeProduct[];
}
