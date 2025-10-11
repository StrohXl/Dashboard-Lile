import { updateData } from "@/services/put/updateData";
import { ParamValue } from "next/dist/server/request/params";
import { toast } from "react-toastify";

import { Sale } from "@/models/api/sale";
import { ResponseData } from "@/models/response/responseData.model";

import { createAddaptedSale } from "../adapters/createAddaptedSale";
import { FormSale } from "../models";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: ResponseData<Sale> };
    message: string;
  };
}

export const onSubmitSaleById = async ({
  body,
  setDisabled,
  setFormSteps,
  id,
  setReload,
  reload,
}: {
  body: FormSale;
  setDisabled: (value: boolean) => void;
  setFormSteps: (value: number) => void;
  reload: boolean;
  setReload: (value: boolean) => void;
  id: ParamValue;
}) => {
  const newBody = createAddaptedSale(body);
  try {
    setDisabled(true);
    await toast.promise(
      updateData({
        apiUrl: "/sales",
        id: Number(id),
        body: {
          payments: newBody.payments,
          change_manager: newBody.change_manager,
        },
      }),
      {
        error: {
          render({ data }: ResponseAxios) {
            if (data.response.data) {
              return data.response.data.message;
            }
            return data.message;
          },
        },
        pending: "Guardando....",
        success: "Venta actualizada",
      }
    );
    setReload(!reload);
    setFormSteps(0);
    setDisabled(false);
  } catch (error) {
    console.error(error);
    setDisabled(false);
  }
};
