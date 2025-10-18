import { updateData } from "@/services/put/updateData";
import { toast } from "react-toastify";

import { Sale } from "@/models/api/sale";
import { ResponseData } from "@/models/response/responseData.model";

import { createAddaptedSale } from "../adapters/createAddaptedSale";
import { FormSale, SaleSchemaHook } from "../models";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: ResponseData<Sale> };
    message: string;
  };
}

export const onSubmitSaleById = async ({
  body,
  contextSale,
}: {
  body: FormSale;
  contextSale: SaleSchemaHook;
}) => {
  const newBody = createAddaptedSale(body);
  const { setDisabled, id, setReload, setFormSteps, reload } = contextSale;

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
