import TypeProduct from "@/app/api/products/type/typeProducts";
import InputFormNumber from "@/components/products/forms/components/inputFormNumber";
import InputFormText from "@/components/products/forms/components/InputFormText";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface FormFieldsProps {
  register: UseFormRegister<TypeProduct>;
  handleSubmit: UseFormHandleSubmit<TypeProduct>;
  onSubmit: (data: TypeProduct) => void;
  errors: FieldErrors<TypeProduct>;
  disabled: boolean;
  data: TypeProduct | undefined;

}

export default function FormFields({
  handleSubmit,
  onSubmit,
  errors,
  register,
  data,
  disabled,
}: FormFieldsProps) {
  return (
    <form
      className="flex flex-col gap-4 max-w-lg mt-12 !px-5 container-table"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
        Producto
      </h4>
      <InputFormText
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
      <label className={`font-roboto`}>
        Descripcion del Producto
        <textarea
          placeholder="Description del Producto"
          className="border-1 mt-2  !border-gray-400 w-full min-h-28 rounded-sm py-2 px-3 outline-none focus:border-primary  "
          {...register("description")}
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <InputFormNumber
          error={errors.price}
          label="Precio en $"
          nameField="price"
          register={register}
          placeholder="1"
          defaultValue={1}
          options={{
            required: "Este campo es requerido",
          }}
        />
        <InputFormNumber
          error={errors.stock}
          label="Cantidad" 
          nameField="stock"
          defaultValue={1}
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
        {data? 'Guardar cambios':'Crear'}
      </button>
    </form>
  );
}
