import { FormProduct } from "../models/form-product.model";
import { Product } from "../models/product.model";

export const editBodyProductAdapter = ({
  body,
  iva,
}: {
  body: FormProduct;
  iva: number;
}) => {
  const product: Product = {
    id: body.id,
    name: body.name.toLocaleLowerCase(),
    price: body.iva == "true"
      ? Number(
          (
            Number(body.price) * Number(`0.${iva}`) +
            Number(body.price)
          ).toFixed(2)
        )
      : Number(body.price.toFixed(2)),
    stock: Number(body.stock),
    unit: body.unit,
    iva: body.iva == "true" ? true : false,
  };
  return product;
};
