"use client";
import TypeUser from "@/app/api/users/type/typeUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLock } from "react-icons/tb";

import InputForm from "@/components/dashboard/form/inputForm";

import { onSubmitLogin } from "../services/onSubmitLogin.service";

export default function FormLogin() {
  // Hooks

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // UseForm

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TypeUser>();

  // Services

  const onSubmit = async (data: TypeUser) => {
    onSubmitLogin({ data, setError, setLoading });
  };

  // UseEffect

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="max-w-[400px] w-full z-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white border-1 dark:bg-gray-800 shadow-lg border-gray-300 dark:border-gray-700 relative rounded-xl p-8"
      >
        <div className="flex flex-col  text-gray-00 gap-3 justify-center items-center">
          <h2 className="font-roboto text-gray-800 dark:text-white mb-9 font-bold text-3xl">
            Inicia Sesión
          </h2>
        </div>
        <div className="flex flex-col gap-6 mb-7">
          <InputForm
            iconStart={<MdOutlineMailOutline size={20} />}
            error={errors.email}
            nameField="email"
            placeholder="Correo Electrónico"
            register={register}
            options={{
              required: "Este campo es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de correo electrónico incorrecto",
              },
            }}
          />
          <InputForm
            error={errors.password}
            iconStart={<TbLock size={20} />}
            nameField="password"
            register={register}
            type="password"
            placeholder="Contraseña"
            options={{
              required: "Este campo es requerido",
              minLength: {
                value: 3,
                message: "Requiere minimo 3 caracteres",
              },
            }}
          />
        </div>
        {error && (
          <p className="text-center  mb-7 text-red-500 font-roboto">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full transition-colors text-white duration-300 hover:bg-primary-ligth disabled:cursor-not-allowed disabled:bg-primary-dark flex justify-center text-lg px-6 py-2 font-roboto bg-primary cursor-pointer rounded-lg"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={22} />
          ) : (
            "Iniciar Sesión"
          )}
        </button>
        <div className="text-center mt-6">
          <Link
            href={"/"}
            className="text-primary text-sm  font-medium  transition-colors hover:text-primary/50"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-800 dark:text-white">
          {"¿No tienes una cuenta? "}
          <Link
            className="font-medium text-primary transition-colors hover:text-primary/50"
            href="/sign-up"
          >
            Crear Cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
