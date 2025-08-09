import { FormBuyType } from "./types";
import {
  FieldValues,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
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
}: {
  value: number;
  products: DataProductType;
  prepend: UseFieldArrayPrepend<FormBuyType>;
}) => {
  const product = products.data.find((item) => item.id === value);

  if (product) {
    prepend({
      id: product.id,
      name: product.name,
      price: 0.1,
      stock: 1,
    });
  }
};

export const appendField = ({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormBuyType>;
}) => {
  prepend({
    id: 0,
    name: "",
    price: 0.1,
    stock: 1,
    type: "create",
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

  body.products.forEach((item) => {
    delete item.type;
    item.price = 1;
    item.stock = 1;
  });

  try {
    await toast.promise(axios.post("/api/buys", body.products), {
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
  } catch (error) {}
  setDisabled(false);
};
