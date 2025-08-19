import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormBuy } from "../models";
import { createAddaptedBuy } from "../adapters/createAddaptedBuy";

export const onSubmit = async ({
  body,
  setDisabled,
  router,
}: {
  body: FormBuy;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  setDisabled(true);
  const data = createAddaptedBuy(body);
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
