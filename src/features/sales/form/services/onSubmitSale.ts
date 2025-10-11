import createData from "@/services/post/createData";
import { RefObject } from "react";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

import { Sale } from "@/models/api/sale";
import { ResponseData } from "@/models/response/responseData.model";

import { createAddaptedSale } from "../adapters/createAddaptedSale";
import { FormSale } from "../models";
import { resetAll } from "../utilities/resetAll";

/*
import { downloadPdf } from "@/documents/utils/downloadPdf";
*/
interface ResponseAxios {
  data: {
    status: number;
    response: { data: ResponseData<Sale> };
    message: string;
  };
}
export const onSubmitSale = async ({
  body,
  reset,
  setDisabled,
  setFormSteps,
  setTotalChanges,
  setTotalPayments,
  setTotalPrice,
  setIdSale,
}: {
  body: FormSale;
  setDisabled: (value: boolean) => void;
  reset: UseFormReset<FormSale>;
  setFormSteps: (value: number) => void;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
  setIdSale: (value: number) => void;
  document: RefObject<null>;
}) => {
  const newBody = createAddaptedSale(body);
  try {
    setDisabled(true);
    const toastify: ResponseData<Sale> = await toast.promise(
      createData({ apiUrl: "/sales", body: newBody }),
      {
        error: {
          render({ data }: ResponseAxios) {
            if (data.response.data) {
              return data.response.data.message;
            }
            return data.message;
          },
        },
        pending: "Guardando....",
        success: "Venta concretada",
      }
    );
    if (toastify.data) {
      setIdSale(toastify.data.id);
      setTimeout(async () => {
        /*
        await downloadPdf({
          documentId: toastify.data ? toastify.data.id : 0,
          refElement: document,
        });
        */

        resetAll({
          reset,
          setFormSteps,
          setTotalChanges,
          setTotalPayments,
          setTotalPrice,
        });
        setIdSale(0);
        setDisabled(false);
      }, 300);
    }
  } catch (error) {
    console.error(error);
    setDisabled(false);
  }
};
