import { LuDollarSign } from "react-icons/lu";
import InputFormProduct from "./inputFormProduct";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormProduct } from "../models/form-product.model";
import { SelectFormProduct } from "./selectFormProduct";

export default function BodyFormProduct({
  errors,
  register,
  dollar,
  setValue,
}: {
  dollar: number;
  errors: FieldErrors<FormProduct>;
  register: UseFormRegister<FormProduct>;
  setValue: UseFormSetValue<FormProduct>;
}) {
  return (
    <div className="body-form flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4">
        <div className="lg:col-start-1 lg:col-end-3">
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
        </div>
        <div className="lg:col-start-3 lg:col-end-4">
          <SelectFormProduct
            error={errors.unit}
            label="Tipo"
            nameField="unit"
            register={register}
            selectOptions={[
              { title: "Unidad", value: "unit" },
              { title: "Paquete", value: "package" },
              { title: "Kg", value: "kg" },
            ]}
          />
        </div>
        <div className="lg:col-start-4 lg:col-end-5 ">
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
        </div>
        <div className="lg:col-start-1 lg:col-end-5 ">
          <span
            className={`font-roboto block mb-2  ${
              errors.price || errors.priceBs ? "text-red-500" : "text-gray-700"
            }`}
          >
            Precio:
          </span>
          <div className="grid md:grid-cols-2 gap-4">
            <InputFormProduct
              error={errors.price}
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
                onChange: (event) =>
                  setValue(
                    "priceBs",
                    Number(
                      (Number(event.target.value) * Number(dollar)).toFixed(2)
                    )
                  ),
              }}
              iconEnd={<LuDollarSign />}
            />
            <InputFormProduct
              error={errors.priceBs}
              nameField="priceBs"
              register={register}
              defaultValue={0}
              placeholder="1"
              type="number"
              step="any"
              options={{
                onChange: (event) =>
                  setValue(
                    "price",
                    Number((event.target.value / Number(dollar)).toFixed(2))
                  ),
              }}
              iconEnd={<span>Bs</span>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
