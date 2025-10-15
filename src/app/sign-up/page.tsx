"use client";

import Link from "next/link";
import Image from "next/image";
import FormSignUp from "@/features/sign-up/FormSignUp";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [theme, setTheme] = useState("dark");
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme") ?? "dark");
  }, []);

  return (
    <main
      data-theme={theme}
      className="flex-grow flex items-center bg-white dark:bg-dark justify-center py-12 px-4 sm:px-6 lg:px-8  min-h-dvh"
    >
      <Image
        src={"/21317.jpg"}
        className="z-1 object-cover opacity-10"
        fill
        alt="Login"
        priority
      />
      <div className="w-full max-w-md space-y-8 p-8 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border-light dark:border-border-dark">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Crea tu cuenta
          </h2>
          <div className="mt-4 flex justify-center space-x-2">
            <div
              className="w-8 h-2 rounded-full bg-primary"
              id="progress-step-1"
            ></div>
            <div
              className="w-8 h-2 rounded-full bg-primary/30 relative  overflow-hidden"
              id="progress-step-2"
            >
              <div
                className={`w-8 h-2 rounded-full bg-primary absolute top-0 -left-full transition-all duration-300 ${step >= 2 && '!left-0'}`}
                id="progress-step-2"
              ></div>
            </div>
            <div
              className="w-8 h-2 rounded-full bg-primary/30 relative  overflow-hidden"
              id="progress-step-3"
            >
              <div
                className={`w-8 h-2 rounded-full bg-primary absolute top-0 -left-full transition-all duration-300 ${step == 3 && '!left-0'}`}
                id="progress-step-3"
              ></div>
            </div>
          </div>
        </div>
        <FormSignUp step={step} setStep={setStep} />
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          {`¿Ya tienes una cuenta? `}
          <Link
            className="font-medium text-primary hover:text-primary/70"
            href="/"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
