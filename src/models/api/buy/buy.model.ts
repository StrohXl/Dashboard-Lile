import { Product } from "@/models/api/product";
import { User } from "../user/user.model";

export interface Buy  {
  id: number;
  products: Product[];
  list_products: Product[];
  total_price: number;
  createdAT: string;
  updatedAT: string;
  userId: number;
  User: User
}
