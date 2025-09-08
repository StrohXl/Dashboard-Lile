import { UseFormReset } from "react-hook-form";
import { FormSale } from "../models";
import { toast } from "react-toastify";
import axios from "axios";
import { createAddaptedSale } from "../adapters/createAddaptedSale";
import { resetAll } from "../utilities/resetAll";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
export const onSubmitSale = async ({
  body,
  reset,
  setDisabled,
  setFormSteps,
  setTotalChanges,
  setTotalPayments,
  setTotalPrice,
}: {
  body: FormSale;
  setDisabled: (value: boolean) => void;
  reset: UseFormReset<FormSale>;
  setFormSteps: (value: number) => void;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
}) => {
  const newBody = createAddaptedSale(body);
  try {
    setDisabled(true);
    await toast.promise(axios.post("/api/sales", newBody), {
      error: {
        render({ data }: ResponseAxios) {
          if (data.response.data) {
            return data.response.data;
          }
          return data.message;
        },
      },
      pending: "Guardando....",
      success: "Venta concretada",
    });
    resetAll({
      reset,
      setFormSteps,
      setTotalChanges,
      setTotalPayments,
      setTotalPrice,
    });

    setDisabled(false);
  } catch (error) {
    console.error(error);
    setDisabled(false);
  }
};
