import { UseFormReturn } from "react-hook-form";
import { FormSignUpModel } from "../models/formSignUp.model";
import { toast } from "react-toastify";
import axios from "axios";

interface AxiosResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export async function sendEmail({
  useFormSignUp,
  setLoading,
  setStep,
}: {
  useFormSignUp: UseFormReturn<FormSignUpModel>;
  setLoading: (value: boolean) => void;
  setStep: (value: number) => void;
}) {
  const { getValues, trigger } = useFormSignUp;

  const email = getValues("email");
  const statusEmail = await trigger("email");
  if (statusEmail || email !== "") {
    setLoading(true);
    try {
      await toast.promise(axios.post("/api/send_email", { email }), {
        success: "Se envío un correo de verificación",
        error: {
          render({ data }: { data: AxiosResponse }) {
            if (data.response.data.message) {
              return data.response.data.message;
            }
            return "Error";
          },
        },
        pending: "Enviando correo de verificación...",
      });

      setStep(2);
    } catch {}
    setLoading(false);
  }
}
