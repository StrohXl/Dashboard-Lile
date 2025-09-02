export interface FormBuy {
  products: {
    id: number;
    name: string;
    price: number;
    stock: number;
    type: "create" | "select";
    sellingPrice: number;
    buyType: "unit" | "package" | "kg";
    moneyType: "dollar" | "bs";
    markup: number;
  }[];
}
