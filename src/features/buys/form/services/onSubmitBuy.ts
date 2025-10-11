import createData from "@/services/post/createData";
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

import { Buy } from "@/models/api/buy";
import { ResponseData } from "@/models/response/responseData.model";

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
    await toast.promise(createData({ apiUrl: "/buys", body: data }), {
      pending: "Creando compra...",
      success: "Compra creada",
      error: {
        render: (error) => {
          if (error instanceof AxiosError) {
            console.error("error");
            const newError: ResponseData<Buy> = error.response?.data;
            return newError.message;
          }
          return "Error";
        },
      },
    });
    router.push("/dashboard/buys");
  } catch (error) {
    console.log(error);
  }
  setDisabled(false);
};
