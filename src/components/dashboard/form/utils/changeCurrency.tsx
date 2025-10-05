import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

export function changeCurrency<T extends FieldValues>({
  setValue,
  typeOfCurrency,
  dollar,
  price,
  nameFieldCurrency,
  nameFieldPrice,
}: {
  price: number;
  typeOfCurrency: "bs" | "dollar";
  nameFieldCurrency: Path<T>;
  nameFieldPrice: Path<T>;
  setValue: UseFormSetValue<T>;
  dollar: number;
}) {
  if (typeOfCurrency == "bs") {
    setValue(nameFieldCurrency, "dollar" as PathValue<T, Path<T>>);
    const priceDollar = Number((price / dollar).toFixed(2));
    setValue(nameFieldPrice, priceDollar as PathValue<T, Path<T>>);
  } else {
    setValue(nameFieldCurrency, "bs" as PathValue<T, Path<T>>);
    const priceBs = Number((price * dollar).toFixed(2));
    setValue(nameFieldPrice, priceBs as PathValue<T, Path<T>>);
  }
}
