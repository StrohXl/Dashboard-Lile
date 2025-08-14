import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { changeSellingPrice } from "../utilities";
import { FormBuy } from "../models";

export default function SelectMoneyType({
  getValues,
  index,
  pyDollar,
  register,
  setValue,
}: {
  index: number;
  register: UseFormRegister<FormBuy>;
  getValues: UseFormGetValues<FormBuy>;
  pyDollar: number;
  setValue: UseFormSetValue<FormBuy>;
}) {
  return (
    <select
      className="outline-none"
      {...register(`products.${index}.moneyType`, {
        onChange: () =>
          changeSellingPrice({
            getValues,
            index,
            pyDollar,
            setValue,
          }),
      })}
    >
      <option value="dollar">$</option>
      <option value="bs">Bs</option>
    </select>
  );
}
