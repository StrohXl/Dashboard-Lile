import { UseFormReset } from "react-hook-form";
import { FormSale } from "../models";
import { toast } from "react-toastify";
import axios from "axios";
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
}: {
  body: FormSale;
  reset: UseFormReset<FormSale>;
  setDisabled: (value: boolean) => void;
}) => {
  setDisabled(true);
  try {
    await toast.promise(axios.post("/api/sales", body), {
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
    reset({
      change_manager: [],
      list_products: [],
      payments: [
        { operation: 0, payment_amount: 0, payment_method: "efectivo Bs" },
      ],
    });
  } catch (error) {
    console.error(error);
  }
  setDisabled(false);
};
