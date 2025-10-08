
import { Client } from "@/models/api/client/client.model";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
export async function onSubmitClient({
  body,
  setDisabled,
  router,
}: {
  body: Client;
  router: AppRouterInstance;
  setDisabled: (value: boolean) => void;
}) {
  setDisabled(true);
  body.ci = Number(body.ci);
  try {
    await toast.promise(axios.post("/api/clients", body), {
      pending: "Guardando...",
      success: "Cliente Creado",
      error: {
        render({ data }: ResponseAxios) {
          if (data.response.data) {
            return data.response.data;
          } else {
            return data.message;
          }
        },
      },
    });
    router.push("/dashboard/clients");
  } catch (error) {
    console.error(error);
    setDisabled(false);
  }
}
