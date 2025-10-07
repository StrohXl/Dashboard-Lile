import axios from "axios";
import { UseFieldArrayRemove, UseFormGetValues } from "react-hook-form";
import { toast } from "react-toastify";


import { FormSale } from "../../../models";
import { updateTotalChanges } from "../utils";

export async function deleteChange({
  dollar,
  getValues,
  id,
  remove,
  setTotalChanges,
  setDisabled,
  index,
}: {
  index: number;
  id: number;
  remove: UseFieldArrayRemove;
  dollar: number;
  getValues: UseFormGetValues<FormSale>;
  setTotalChanges: (value: number) => void;
  setDisabled: (value: boolean) => void;
}) {
  setDisabled(true);
  try {
    await toast.promise(axios.delete(`/api/change_manager/${id}`), {
      pending: "Eliminando..",
      success: "Cambio eliminado",
      error: "Error",
    });
    remove(index);
    updateTotalChanges({ dollar, getValues, setTotalChanges });
  } catch (error) {
    console.error(error);
  }
  setDisabled(false);
}
