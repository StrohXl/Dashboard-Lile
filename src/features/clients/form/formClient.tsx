"use client";
import { Client } from "@/app/api/clients/models/client.model";
import { useForm } from "react-hook-form";
import InputForm from "./components/inputForm";
import { onSubmitClient } from "./service/onSubmitClient";
import FormClientHooks from "./hooks/formHooks";

export default function FormClient() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Client>();

  const { disabled, setDisabled, router } = FormClientHooks();
  return (
    <form
      onSubmit={handleSubmit((body) =>
        onSubmitClient({ body, setDisabled, router })
      )}
      className="container-table max-w-[800px]"
    >
      <h4 className="font-open_sans text-gray-800 font-semibold text-2xl">
        Cliente
      </h4>
      <div className="grid sm:grid-cols-2 mt-6 mb-10 gap-4">
        <InputForm
          error={errors.name}
          label="Nombre"
          nameField="name"
          placeholder="Nombre del cliente"
          register={register}
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
        />
        <InputForm
          error={errors.last_name}
          label="Apellido"
          nameField="last_name"
          placeholder="Apellido del cliente"
          register={register}
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
        />
      </div>
      <button
        disabled={disabled}
        className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Guardar Cliente
      </button>
    </form>
  );
}
