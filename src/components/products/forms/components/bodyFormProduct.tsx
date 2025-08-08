import { LuDollarSign } from "react-icons/lu";
import InputFormProduct from "./inputFormProduct";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductPriceBsType } from "../formProduct";

export default function BodyFormProduct({
  errors,
  register,
}: {
  errors: FieldErrors<ProductPriceBsType>;
  register: UseFormRegister<ProductPriceBsType>;
}) {
  return (
    <div className="body-form flex flex-col gap-4">
      <InputFormProduct
        error={errors.name}
        label="Nombre del Producto"
        nameField="name"
        register={register}
        options={{
          required: "Este campo es requerido",
          minLength: {
            value: 3,
            message: "El nombre debe de tener minimo 3 caracteres",
          },
        }}
      />
      <InputFormProduct
        error={errors.stock}
        label="Cantidad"
        nameField="stock"
        defaultValue={0}
        register={register}
        placeholder="1"
        type="number"
        options={{
          required: "Este campo es requerido",
          min: {
            value: 1,
            message: "La cantidad debe de ser  minimo 1",
          },
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputFormProduct
          error={errors.price}
          label="Precio en $"
          nameField="price"
          register={register}
          placeholder="1"
          step="any"
          type="number"
          defaultValue={0}
          options={{
            required: "Este campo es requerido",
            min: {
              value: 0.1,
              message: "La cantidad debe de ser  minimo 0.1",
            },
          }}
          iconEnd={<LuDollarSign />}
        />
        <InputFormProduct
          error={errors.priceBs}
          label="Precio en Bs"
          nameField="priceBs"
          register={register}
          defaultValue={0}
          placeholder="1"
          disabled={true}
          type="number"
          iconEnd={<span>Bs</span>}
        />
      </div>
    </div>
  );
}
