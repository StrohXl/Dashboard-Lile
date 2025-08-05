"use client";
import { useForm } from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";
import HooksForm from "./hooks";
import onSubmit from "./utils/onSubmit";
import InputFormProduct from "./components/inputFormProduct";

export default function FormProduct({
  data,
}: {
  data?: TypeProduct | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeProduct>();

  const { disabled, id, router, setDisabled } = HooksForm({ data, reset });

  return (
    <form
      className="flex flex-col gap-4 max-w-sm mt-12 !px-5 container-table"
      onSubmit={handleSubmit((body) =>
        onSubmit({ body, data, id, reset, router, setDisabled })
      )}
    >
      <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
        Producto
      </h4>

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
      <div className="grid grid-cols-2 gap-4">
        <InputFormProduct
          error={errors.price}
          label="Precio en $"
          nameField="price"
          register={register}
          placeholder="1"
          step="any"
          defaultValue={0}
          options={{
            required: "Este campo es requerido",
            min: {
              value: 0.1,
              message: "La cantidad debe de ser  minimo 0.1",
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
          options={{
            required: "Este campo es requerido",
            min: {
              value: 1,
              message: "La cantidad debe de ser  minimo 1",
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="btn-primary mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
      >
        {data ? "Guardar cambios" : "Crear"}
      </button>
    </form>
  );
}
