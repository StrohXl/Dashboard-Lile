import { FormSale } from "../models";
import { toast } from "react-toastify";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { createAddaptedSale } from "../adapters/createAddaptedSale";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
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
      axios.put(`/api/sales/${id}`, { payments: newBody.payments }),
      {
        error: {
          render({ data }: ResponseAxios) {
            if (data.response.data) {
              return data.response.data;
            }
            return data.message;
          },
        },
        pending: "Guardando....",
        success: "Venta actualizada",
      }
    );
    setReload(!reload)
    setFormSteps(0);
    setDisabled(false);
  } catch (error) {
    console.error(error);
    setDisabled(false);
  }
};
