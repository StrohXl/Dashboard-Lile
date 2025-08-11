import MessageError from "@/components/dashboard/forms/components/messageError";
import { SelectFormBuyType } from "../types";

function SelectFormBuy({
  error,
  label,
  iconStart,
  iconEnd,
  nameField,
  options,
  register,
  setValue,
  getValues,
  index,
  selectOptions,
}: SelectFormBuyType) {
  
  const changeSellingPrice = (markup: number) => {
    const price = getValues(`products.${index}.price`);
    const stock = getValues(`products.${index}.stock`);
    const priceIndividual = price / stock;
    const sellingPrice = priceIndividual * markup + priceIndividual;

    setValue(`products.${index}.sellingPrice`, sellingPrice);
  };

  return (
    <label
      className={`font-roboto relative  ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      <span>{label}:</span>
      <div
        className={`border-1
               ${error ? "!border-red-500" : "border-gray-700"}
              focus-within:border-primary flex items-center mt-2 px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
      >
        {iconStart && (
          <span className={`text-gray-700 ${error && "text-red-500"}`}>
            {iconStart}
          </span>
        )}
        <select
          className="w-full bg-transparent autofill:bg-transparent outline-none"
          {...register(nameField, options)}
          onChange={(item) => changeSellingPrice(Number(item.target.value))}
        >
          {selectOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
        {iconEnd && (
          <span className={`text-gray-700 ${error && "text-red-500"}`}>
            {iconEnd}
          </span>
        )}
      </div>
      <MessageError error={error} />
    </label>
  );
}

export default SelectFormBuy;
