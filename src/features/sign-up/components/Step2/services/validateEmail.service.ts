import axios from "axios";
import { UseFormGetValues } from "react-hook-form";
import { toast } from "react-toastify";

import { FormSignUpModel } from "@/features/sign-up/models/formSignUp.model";

export async function validateEmail({
  setLoading,
  setStep,
  token,
  getValues,
}: {
  setLoading: (value: boolean) => void;
  setStep: (value: number) => void;
  getValues: UseFormGetValues<FormSignUpModel>;
  token: string;
}) {
  const email = getValues("email");
  setLoading(true);
  try {
    await toast.promise(axios.post("/api/validate_user", { email, token }), {
      success: "Correo verificado",
      error: "Token invalido",
      pending: "",
    });
    setStep(3);
  } catch {}
  setLoading(false);
}
