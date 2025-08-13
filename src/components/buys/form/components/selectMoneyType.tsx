import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormBuyType } from "../types";
import { changeSellingPrice } from "../utils";

export default function SelectMoneyType({
  getValues,
  index,
  pyDollar,
  register,
  setValue,
}: {
  index: number;
  register: UseFormRegister<FormBuyType>;
  getValues: UseFormGetValues<FormBuyType>;
  pyDollar: number;
  setValue: UseFormSetValue<FormBuyType>;
}) {
  return (
    <select
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
