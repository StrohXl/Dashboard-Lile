import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";



import { FormSignUpModel } from "../../models/formSignUp.model";
import { sendEmail } from "../../services";
import RepeatInputToken from "./components/RepeatInputTokent";
import useResendTimer from "./hook/useResendTimer";
import { validateEmail } from "./services/validateEmail.service";
import { onChangeInput } from "./utils/onChangeInput";
import { onPaste } from "./utils/onPaste";
import { verifiedFields } from "./utils/verifiedFields";

export default function Step2({
  loading,
  stepBack,
  setLoading,
  setStep,
  useFormSignUp,
}: {
  stepBack: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setStep: (value: number) => void;
  useFormSignUp: UseFormReturn<FormSignUpModel>;
}) {
  // Hooks

  const { timeLeft, isActive, startTimer, formatTime } = useResendTimer(60);

  // UseForm

  const {
    register,
    formState: { errors },
    setValue,
    setFocus,
    getValues,
    setError,
  } = useFormSignUp;

  // Functions

  const onChange = ({
    event,
    position,
  }: {
    position: number;
    event: ChangeEvent<HTMLInputElement>;
  }) => {
    onChangeInput({ event, position, setFocus, setValue });
  };

  const resendEmail = async () => {
    await sendEmail({ setLoading, setStep, useFormSignUp });
    startTimer(60);
  };

  const onClickStep2 = () => {
    const value = verifiedFields({ getValues, setError });
    const token = `${getValues("token_1")}${getValues("token_2")}${getValues("token_3")}${getValues("token_4")}${getValues("token_5")}${getValues("token_6")}`;
    if (value) {
      validateEmail({ setLoading, setStep, token, getValues });
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary">
          <HiOutlineMail size={35} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Confirma tu correo electrónico
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Hemos enviado un código de verificación a tu correo electrónico. Por
        favor, introdúcelo a continuación.
      </p>

      <RepeatInputToken
        errors={errors}
        onChange={onChange}
        onPaste={(event) =>
          onPaste({
            event,
            setValue,
            validateEmail: onClickStep2,
          })
        }
        register={register}
      />

      <p className="my-7 text-sm text-gray-600 dark:text-gray-400">
        {`¿No has recibido el código? `}
        {isActive ? (
          <span className="font-medium cursor-pointer text-gray-00">
            Reenviar en {formatTime(timeLeft)}
          </span>
        ) : (
          <span
            onClick={resendEmail}
            className="font-medium text-primary cursor-pointer hover:text-primary/70"
          >
            Reenviar código
          </span>
        )}
      </p>

      <div className="flex space-x-4">
        <button
          className="group relative flex-1 flex justify-center py-3 px-4 border border-transparent items-center  cursor-pointer gap-3 text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
          type="button"
          onClick={stepBack}
        >
          <HiOutlineArrowSmallLeft size={20} />
          Regresar
        </button>
        <button
          className="group relative flex-1 flex justify-center py-3 px-4 border border-transparent items-center  cursor-pointer gap-3 text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90"
          type="button"
          disabled={loading}
          onClick={onClickStep2}
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
