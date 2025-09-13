import {
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../../models";
import { OptionList } from "../models/optionList.model";
import { useContextSale } from "../../../hooks/saleHookContext";
import { updateTotalChanges, updateTotalPayments } from "../utils";
import { IoClose } from "react-icons/io5";
import { deletePayment } from "../services/deletePayment.service";
import { deleteChange } from "../services/deleteChange.service";
import { MdDelete } from "react-icons/md";

export default function ContainerActions({
  remove,
  watch,
  option,
  index,
  getValues,
}: {
  watch: UseFormWatch<FormSale>;
  remove: UseFieldArrayRemove;
  option: OptionList;
  index: number;
  getValues: UseFormGetValues<FormSale>;
}) {
  const { setTotalChanges, dollar, disabled, setDisabled, setTotalPayments } =
    useContextSale();

  const id = Number(
    watch(`${option == "payments" ? "payments" : "change_manager"}.${index}.id`)
  );

  const removeFields = () => {
    if (option == "changes" && id == 0) {
      remove(index);
      updateTotalChanges({
        dollar,
        getValues,
        setTotalChanges,
      });
    } else if (option == "changes" && id != 0) {
      deleteChange({
        dollar,
        getValues,
        id,
        remove,
        index,
        setDisabled,
        setTotalChanges,
      });
    } else if (option == "payments" && id == 0) {
      remove(index);
      updateTotalPayments({
        dollar,
        getValues,
        setTotalPayments,
      });
    } else if (option == "payments" && id != 0) {
      deletePayment({
        dollar,
        getValues,
        id,
        remove,
        index,
        setTotalPayments,
        setDisabled,
      });
    }
  };

  return (
    <div className="container-actions flex justify-center gap-4 items-center">
      <button type="button" disabled={disabled} onClick={removeFields}>
        {id == 0 ? <IoClose size={22} /> : <MdDelete size={22} />}
      </button>
    </div>
  );
}
