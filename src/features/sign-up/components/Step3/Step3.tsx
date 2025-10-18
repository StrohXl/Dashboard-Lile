import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import InputForm from "@/components/dashboard/form/inputForm";

import { FormSignUpModel } from "../../models/formSignUp.model";

export default function Step3({
  useFormSignUp,
  loading,
}: {
  useFormSignUp: UseFormReturn<FormSignUpModel>;
  loading: boolean;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormSignUp;

  const [typeInput, setTypeInput] = useState<"password" | "text">("password");

  const password = watch("create_password");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:gap-4 md:grid-cols-2">
        <InputForm<FormSignUpModel>
          nameField={"name"}
          register={register}
          error={errors.name}
          placeholder="Nombre"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 3,
              message: "Minimo 3 caracteres",
            },
          }}
        />
        <InputForm<FormSignUpModel>
          nameField={"last_name"}
          register={register}
          error={errors.last_name}
          placeholder="Apellido"
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 3,
              message: "Minimo 3 caracteres",
            },
          }}
        />
      </div>

      <InputForm<FormSignUpModel>
        nameField={"create_password"}
        register={register}
        error={errors.create_password}
        placeholder="Contraseña"
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: "Debe contener mayúsculas, minúsculas y números",
          },
        }}
        type={typeInput}
        iconEnd={
          typeInput == "password" ? (
            <FaEye className="cursor-pointer" size={20} onClick={() => setTypeInput("text")} />
          ) : (
            <FaEyeSlash className="cursor-pointer"
             size={20} onClick={() => setTypeInput("password")} />
          )
        }
      />

      <InputForm<FormSignUpModel>
        nameField={"confirm_password"}
        register={register}
        error={errors.confirm_password}
        placeholder="Confirme contraseña"
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          validate: (value) =>
            value === password || "Las contraseñas no coinciden",
        }}
        type="password"
      />
      <div className="mt-2">
        <button
          className="group relative w-full flex items-center cursor-pointer gap-2 justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary disabled:opacity-70 hover:bg-primary/90 focus:outline-none"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={22} />
          ) : (
            <>Crear cuenta</>
          )}
        </button>
      </div>
    </div>
  );
}
