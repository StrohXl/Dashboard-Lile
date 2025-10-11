import createData from "@/services/post/createData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

import { Client } from "@/models/api/client/client.model";
import { ResponseData } from "@/models/response/responseData.model";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: ResponseData<Client> };
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
    await toast.promise(createData({ apiUrl: "/clients", body }), {
      pending: "Guardando...",
      success: "Cliente Creado",
      error: {
        render({ data }: ResponseAxios) {
          if (data.response.data) {
            return data.response.data.message;
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
