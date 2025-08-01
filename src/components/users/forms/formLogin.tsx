"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TypeUser from "@/app/api/users/type/typeUser";
import InputFormText from "./components/InputFormText";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function FormLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TypeUser>();
  const router = useRouter();
  const onSubmit = async (data: TypeUser) => {
    try {
      setLoading(true);
      await axios.post("/api/login", data);
      setError("");
      toast.success("Iniciando Sesión");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[400px] w-full bg-white/70 text-white flex flex-col gap-3 backdrop-blur-xs  rounded-lg p-6  pb-12"
    >
      <div className="flex flex-col  text-gray-700 gap-3 justify-center items-center  my-6">
        <FaUser size={40} className="" />
        <h2 className="font-open_sans font-semibold text-3xl">Login</h2>
      </div>
      <InputFormText
        iconStart={<MdOutlineMailOutline size={20} />}
        error={errors.email}
        label="Correo Electronico"
        nameField="email"
        register={register}
        options={{
          required: "Este campo es requerido",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Formato de correo electrónico incorrecto",
          },
        }}
      />
      <InputFormText
        error={errors.password}
        label="Contraseña"
        iconStart={<TbLock size={20} />}
        nameField="password"
        register={register}
        type="password"
        options={{
          required: "Este campo es requerido",
          minLength: {
            value: 3,
            message: "Requiere minimo 3 caracteres",
          },
        }}
      />
      <p className="text-center mt-3  mb-3 text-red-500 font-roboto">
        {error && error}
      </p>
      <button
        type="submit"
        disabled={loading}
        className=" transition-colors duration-300 hover:bg-primary-ligth disabled:cursor-not-allowed disabled:bg-primary-dark flex justify-center text-lg px-6 py-2 font-roboto font-medium bg-primary cursor-pointer rounded-md"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" size={22} />
        ) : (
          "Iniciar Sesión"
        )}
      </button>
    </form>
  );
}
