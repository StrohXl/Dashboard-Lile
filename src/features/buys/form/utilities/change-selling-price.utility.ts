import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormBuy } from "../models";

export const changeSellingPrice = ({
  index,
  getValues,
  setValue,
  pyDollar,
}: {
  index: number;
  pyDollar: number;
  getValues: UseFormGetValues<FormBuy>;
  setValue: UseFormSetValue<FormBuy>;
}) => {
  const moneyType = getValues(`products.${index}.moneyType`);
  const priceFormat = getValues(`products.${index}.buyType`);
  const stock = Number(getValues(`products.${index}.stock`));
  const markup = Number(getValues(`products.${index}.markup`));
  const inputPrice = Number(getValues(`products.${index}.price`));

  const price =
    moneyType == "dollar"
      ? inputPrice
      : parseFloat((inputPrice / pyDollar).toFixed(2));

  const priceIndividual =
    priceFormat == "unit"
      ? price
      : priceFormat == "package"
      ? price / stock
      : (price * 1000) / stock;

  const sellingPrice = priceIndividual * markup + priceIndividual;

  setValue(`products.${index}.sellingPrice`, sellingPrice);
};
