import { FormBuyType } from "./types";
import {
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type DataProductType = {
  data: TypeProduct[];
  pages: number;
};

export const changeSelect = ({
  products,
  prepend,
  value,
  pyDollar,
}: {
  value: number;
  products: DataProductType;
  prepend: UseFieldArrayPrepend<FormBuyType>;
  pyDollar: number | undefined;
}) => {
  const product = products.data.find((item) => item.id === value);

  if (product) {
    prepend({
      id: product.id,
      name: product.name,
      price: 0.1,
      stock: 1,
      markup: 0.3,
      moneyType: "dollar",
      buyType: "individual",
      sellingPrice: 0.1 * 1 * 0.3 + 0.1,
    });
  }
};

export const appendField = ({
  prepend,
  pyDollar,
}: {
  prepend: UseFieldArrayPrepend<FormBuyType>;
  pyDollar: number | undefined;
}) => {
  prepend({
    id: 0,
    name: "",
    price: 0.1,
    stock: 1,
    moneyType: "dollar",
    buyType: "individual",
    type: "create",
    markup: 0.3,
    sellingPrice: 0.1 * 1 * 0.3 + 0.1,
  });
};

export const removeField = ({
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
}) => {
  remove(index);
};

export const onSubmit = async ({
  body,
  setDisabled,
  router,
}: {
  body: FormBuyType;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  setDisabled(true);
  const newBody: {
    id?: number;
    name: string;
    price: number;
    stock: number;
    sellingPrice: number;
  }[] = [];
  body.products.forEach((item) => {
    const price = item.sellingPrice / (item.markup + 1);
    newBody.push({
      id: item.id,
      name: item.name,
      price: Number(price),
      stock: Number(item.stock),
      sellingPrice: Number(item.sellingPrice),
    });
  });
  console.log(newBody);
  try {
    await toast.promise(axios.post("/api/buys", newBody), {
      pending: "Creando compra...",
      success: "Compra creada",
      error: {
        render: (error) => {
          console.log(error);
          if (error.data instanceof AxiosError) {
            return `${error.data.response?.data}`;
          }
          return `Error`;
        },
      },
    });
    router.push("/dashboard/buys");
  } catch (error) {
    console.log(error);
  }
  setDisabled(false);
};

export const changeSellingPrice = ({
  index,
  getValues,
  setValue,
  pyDollar,
}: {
  index: number;
  pyDollar: number;
  getValues: UseFormGetValues<FormBuyType>;
  setValue: UseFormSetValue<FormBuyType>;
}) => {
  const moneyType = getValues(`products.${index}.moneyType`);
  const priceFormat = getValues(`products.${index}.buyType`);
  const stock = Number(getValues(`products.${index}.stock`));
  const markup = Number(getValues(`products.${index}.markup`));
  const inputPrice = Number(getValues(`products.${index}.price`));

  const price = moneyType == "dollar" ? inputPrice : inputPrice / pyDollar;

  const priceIndividual = priceFormat == "individual" ? price : price / stock;

  const sellingPrice = priceIndividual * markup + priceIndividual;
  console.log({
    moneyType,
    priceFormat,
    stock,
    markup,
    inputPrice,
    price,
    priceIndividual,
    sellingPrice,
  });

  setValue(
    `products.${index}.sellingPrice`,
    parseFloat(sellingPrice.toFixed(2))
  );
};
