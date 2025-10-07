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
  const method = getValues("method");
  const stock = Number(getValues(`products.${index}.stock`));
  let purchase_price = Number(getValues(`products.${index}.purchase_price`));
  const type_of_currency = getValues(`products.${index}.type_of_currency_of_the_purchase`);
  const markup = Number(getValues("markup"));

  let sellingPrice = 0;

  if (type_of_currency == "bs") {
    purchase_price = purchase_price / pyDollar;
  }

  switch (method) {
    case "kg":
      const priceKg = (purchase_price * 1000) / (stock * 1000);
      const totalKg = priceKg * markup + priceKg;
      sellingPrice = totalKg;

      break;

    case "package":
      const individualPrice = purchase_price / stock;
      const totalPackage = Number(
        (individualPrice * markup + individualPrice).toFixed(2)
      );
      sellingPrice = totalPackage;
      break;

    case "unit":
      const totalUnit = Number(
        (purchase_price * markup + purchase_price).toFixed(2)
      );
      sellingPrice = totalUnit;
      break;
  }

  setValue(`selling_price`, sellingPrice);
};
