import { UseFieldArrayRemove, UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";
import { toast } from "react-toastify";
import axios from "axios";
import { updateTotalPayments } from "../utils/updateTotalPayments";

export async function deletePayment({
  dollar,
  getValues,
  id,
  remove,
  setTotalPayments,
  setDisabled,
  index,
}: {
  index: number;
  id: number;
  remove: UseFieldArrayRemove;
  dollar: number;
  getValues: UseFormGetValues<FormSale>;
  setTotalPayments: (value: number) => void;
  setDisabled: (value: boolean) => void;
}) {
  setDisabled(true);
  try {
    await toast.promise(axios.delete(`/api/payments/${id}`), {
      pending: "Eliminando..",
      success: "Pago eliminado",
      error: "Error",
    });
    remove(index);
    updateTotalPayments({ dollar, getValues, setTotalPayments });
  } catch (error) {
    console.error(error);
  }
  setDisabled(false);
}
