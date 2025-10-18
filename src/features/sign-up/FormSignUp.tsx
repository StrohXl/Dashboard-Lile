"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Step1 from "./components/Step1/Step1";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import { FormSignUpModel } from "./models/formSignUp.model";
import { onSubmitSignUp } from "./services/onSubmitSignUp.service";


export default function FormSignUp({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) {
  // Hooks

  const [loading, setLoading] = useState<boolean>(false);

  // Form
  const useFormSignUp = useForm<FormSignUpModel>({
    mode: "onChange",
    defaultValues: {
      token_1: "",
      token_2: "",
      token_3: "",
      token_4: "",
      token_5: "",
      token_6: "",
      name: "",
      last_name: "",
      confirm_password: "",
      create_password: "",
    },
  });

  // Services

  const onSubmit = async (body: FormSignUpModel) => {
    const salt = process.env.BCRYPT_SALT ?? 0;
    setLoading(true);
    try {
      await onSubmitSignUp({ body, salt: Number(salt) });
      toast.success("Usuario creado exitosamente");
      setTimeout(() => window.location.assign("/"), 2000);
      
    } catch {
      setLoading(false);
      toast.error("Error al crear el usuario");
    }
  };

  // Functions

  const stepBack = () => {
    useFormSignUp.setValue("email", "");
    setStep(1);
  };

  return (
    <form autoComplete="off" onSubmit={useFormSignUp.handleSubmit(onSubmit)}>
      {step == 1 && (
        <Step1
          setLoading={setLoading}
          setStep={setStep}
          loading={loading}
          useFormSignUp={useFormSignUp}
        />
      )}
      {step == 2 && (
        <Step2
          loading={loading}
          stepBack={stepBack}
          setLoading={setLoading}
          setStep={setStep}
          useFormSignUp={useFormSignUp}
        />
      )}
      {step == 3 && <Step3 loading={loading} useFormSignUp={useFormSignUp} />}

      <div className="space-y-6 hidden" id="step-3">
        <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white">
          Set your password
        </h3>
        <div className="rounded-lg shadow-sm -space-y-px">
          <div>
            <input
              className="form-input appearance-none rounded-t-lg relative block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-border-light dark:border-border-dark text-slate-900 dark:text-white focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-base"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div>
            <input
              autoComplete="new-password"
              className="form-input appearance-none rounded-b-lg relative block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-border-light dark:border-border-dark text-slate-900 dark:text-white focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-base"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              type="password"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="group relative flex-1 flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            type="button"
          >
            <span className="material-symbols-outlined mr-2 text-base">
              arrow_back
            </span>
            Back
          </button>
          <button
            className="group relative flex-1 flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            type="submit"
          >
            Crear una cuenta
          </button>
        </div>
      </div>
    </form>
  );
}
