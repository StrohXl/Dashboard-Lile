import { LuDollarSign } from "react-icons/lu";

export default function LabelPriceAndPriceIva({
  inputIva,
  price,
  priceIva,
  typeOfCurrency,
}: {
  inputIva: "true" | "false";
  price: number;
  priceIva: number;
  typeOfCurrency: "bs" | "dollar";
}) {
  return (
    <span>
      {inputIva == "true" ? (
        <span className="flex items-center gap-2">
          <span className="line-through text-red-500 flex items-center">
            {price}
            {typeOfCurrency == "bs" ? " Bs" : <LuDollarSign />}
          </span>
          <span className="flex items-center" >
            {priceIva}
            {typeOfCurrency == "bs" ? " Bs" : <LuDollarSign />}
          </span>
        </span>
      ) : (
        <span className="flex items-center" >
          {price}
          {typeOfCurrency == "bs" ? " Bs" : <LuDollarSign />}
        </span>
      )}
    </span>
  );
}
