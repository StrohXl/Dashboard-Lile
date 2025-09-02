export interface ListProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: "unit" | "kg" | "package";
  createdAt?: string;
  updatedAt?: string;
}
