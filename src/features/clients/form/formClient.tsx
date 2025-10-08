"use client";
import { useForm } from "react-hook-form";

import { Client } from "@/models/api/client/client.model";


import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";

import InputForm from "./components/inputForm";
import FormClientHooks from "./hooks/formHooks";
import { onSubmitClient } from "./service/onSubmitClient";
import { onSubmitClientById } from "./service/onSubmitClientById.service";

export default function FormClient() {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
    getValues,
  } = useForm<Client>();

  const { disabled, setDisabled, router, id, loading } = FormClientHooks({
    reset,
    isDirty,
    getValues,
  });

  return (
    <>
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          onSubmit={handleSubmit((body) =>
            id
              ? onSubmitClientById({ body, setDisabled, router, id })
              : onSubmitClient({ body, setDisabled, router })
          )}
          className="container-table max-w-[800px]"
        >
          <h4 className="font-open_sans text-gray-800 font-semibold text-2xl">
            Cliente
          </h4>
          <div className="grid sm:grid-cols-3 mt-6 mb-10 gap-4">
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
                onChange: () => id && setDisabled(false),
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
                onChange: () => id && setDisabled(false),
              }}
            />
            <InputForm
              error={errors.ci}
              label="C.I"
              nameField="ci"
              placeholder="20453535"
              register={register}
              type="number"
              options={{
                required: {
                  message: "Este campo es requerido",
                  value: true,
                },
                minLength: {
                  message: "Minimo 7 caracteres",
                  value: 7,
                },
                onChange: () => id && setDisabled(false),
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
      )}
    </>
  );
}
