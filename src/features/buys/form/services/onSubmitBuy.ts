
import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

import { createAddaptedBuy } from "../adapters/createAddaptedBuy";
import { FormBuy } from "../models";

export const onSubmit = async ({
  body,
  setDisabled,
  router,
  iva,
}: {
  body: FormBuy;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
  iva: number;
}) => {
  setDisabled(true);
  const data = createAddaptedBuy({ body, iva });
  try {
    await toast.promise(axios.post("/api/buys", data), {
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
