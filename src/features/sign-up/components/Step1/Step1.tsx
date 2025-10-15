import InputForm from "@/components/dashboard/form/inputForm";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FormSignUpModel } from "../../models/formSignUp.model";
import { UseFormReturn } from "react-hook-form";
import { sendEmail } from "../../services";

export default function Step1({
  loading,
  useFormSignUp,
  setLoading,
  setStep,
}: {
  loading: boolean;
  useFormSignUp: UseFormReturn<FormSignUpModel>;
  setLoading: (value: boolean) => void;
  setStep: (value: number) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormSignUp;
  return (
    <div className="space-y-6" id="step-1">
      <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white">
        Cual es tu correo electrónico?
      </h3>
      <div>
        <InputForm
          register={register}
          nameField="email"
          error={errors.email}
          placeholder="Correo Electrónico"
          iconStart={<MdOutlineMailOutline size={20} />}
          options={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato invalido",
            },
            required: {
              value: true,
              message: "Escribe tu correo electrónico",
            },
          }}
        />
      </div>
      <div className="pt-2">
        <button
          className="group relative w-full flex items-center cursor-pointer gap-2 justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary disabled:opacity-70 hover:bg-primary/90 focus:outline-none"
          type="button"
          disabled={loading}
          onClick={() => sendEmail({ setLoading, setStep, useFormSignUp })}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={22} />
          ) : (
            <>
              Siguiente
              <HiOutlineArrowSmallRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
