import TypeProduct from "../products/type/typeProducts";

export type BuyType = {
  id: number;
  products: TypeProduct[];
  list_products: TypeProduct[];
  total_price: number;
  createdAT: string;
  updatedAT: string;
  userId: number;
};

export type DataBuyType = {
  data: BuyType[];
  pages: number;
};
