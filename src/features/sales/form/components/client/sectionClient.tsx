import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../models";
import InputSaleForm from "../inputFormSale";
import SelectClient from "./components/selectClient";
import { MdDeleteOutline } from "react-icons/md";

export default function SectionClient({
  register,
  errors,
  reset,
  setValue,
  watch,
}: {
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  reset: UseFormReset<FormSale>;
  watch: UseFormWatch<FormSale>;
  setValue: UseFormSetValue<FormSale>;
}) {
  const idClient = watch("client.id");

  return (
    <div className="flex flex-col gap-4 w-full mt-6 pb-6  ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="font-roboto text-gray-800 font-semibold text-lg">
          Cliente
        </h4>

       <div className="grid md:grid-cols-[250px_250px] gap-4 items-center" >
         <SelectClient setValue={setValue} typeSearch="name"  />
         <SelectClient setValue={setValue} typeSearch="ci"  />
       </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_42px] items-end gap-4 mt-4">
        <input type="hidden" {...register("client.id")} defaultValue={0} />
        <InputSaleForm
          placeholder="Nombre del Cliente"
          error={errors.client?.name}
          register={register}
          nameField="client.name"
          label="Nombre"
          options={{
            required: {
              message: "Este campo es requerido",
              value: true,
            },
            minLength: {
              message: "Minimo 3 caracteres",
              value: 3,
            },
          }}
          disabled={idClient != 0?true:false}
        />
        <InputSaleForm
          placeholder="Apellido del Cliente"
          error={errors.client?.last_name}
          register={register}
          nameField="client.last_name"
          label="Apellido"
          options={{
            required: {
              message: "Este campo es requerido",
              value: true,
            },
            minLength: {
              message: "Minimo 3 caracteres",
              value: 3,
            },
          }}
          disabled={idClient != 0?true:false}

        />
        <InputSaleForm
          placeholder="22304034"
          error={errors.client?.ci}
          register={register}
          nameField="client.ci"
          label="C.I"
          options={{
            required: {
              message: "Este campo es requerido",
              value: true,
            },
            minLength: {
              message: "Minimo 7 caracteres",
              value: 7,
            },
            pattern: {
              value: /\d+/,
              message: "Solo numeros",
            },
          }}
          disabled={idClient != 0?true:false}

        />
        <div className="flex mt-auto h-[42px] items-center justify-center">
          <MdDeleteOutline
            onClick={() =>
              reset({
                client: { id: 0, ci: "", last_name: "", name: "" },
              })
            }
            size={30}
            className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-300 "
          />
        </div>
      </div>
    </div>
  );
}
