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
      priceBs: pyDollar ? Number((0.1 * 0.3 + 0.1 * pyDollar).toFixed(2)) : 1,
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
    type: "create",
    markup: 0.3,
    priceBs: pyDollar ? Number((0.1 * 0.3 + 0.1 * pyDollar).toFixed(2)) : 1,
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
    newBody.push({
      id: item.id,
      name: item.name,
      price: Number(item.price / item.stock),
      stock: Number(item.stock),
      sellingPrice: Number(item.sellingPrice),
    });
  });
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
    console.log(error)
  }
  setDisabled(false);
};

export const changeSellingPrice = ({
  index,
  getValues,
  setValue,
}: {
  index: number;
  getValues: UseFormGetValues<FormBuyType>;
  setValue: UseFormSetValue<FormBuyType>;
}) => {
  const price = getValues(`products.${index}.price`);
  const stock = getValues(`products.${index}.stock`);
  const priceIndividual = price / stock;
  const markup = getValues(`products.${index}.markup`);
  const sellingPrice = priceIndividual * markup + priceIndividual;
  setValue(
    `products.${index}.sellingPrice`,
    parseFloat(sellingPrice.toFixed(2))
  );
};

export const updatePrice = ({
  index,
  value,
  getValues,
  pyDollar,
  setValue,
}: {
  index: number;
  value: number;
  setValue: UseFormSetValue<FormBuyType>;
  pyDollar: number | undefined;
  getValues: UseFormGetValues<FormBuyType>;
}) => {
  const price = pyDollar ? value / pyDollar : 1;
  setValue(`products.${index}.price`, price);
  changeSellingPrice({ index, getValues, setValue });
};

export const updatePriceBs = ({
  index,
  value,
  getValues,
  pyDollar,
  setValue,
}: {
  index: number;
  value: number;
  setValue: UseFormSetValue<FormBuyType>;
  pyDollar: number | undefined;
  getValues: UseFormGetValues<FormBuyType>;
}) => {
  const priceBs = pyDollar ? value * pyDollar : 1;
  setValue(`products.${index}.priceBs`, parseFloat(priceBs.toFixed(2)));
  changeSellingPrice({ index, getValues, setValue });
};
