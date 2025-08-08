import TypeProduct from "../products/type/typeProducts";

export type BuyType = TypeProduct[];

export type DataBuyType = {
  data: BuyType;
  pages: number;
};
