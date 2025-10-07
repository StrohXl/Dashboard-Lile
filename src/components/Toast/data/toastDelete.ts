
import axios from "axios";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { ApiUrl, Data } from "@/models";

const toastDelete = async ({
  ids,
  apiUrl,
  data,
  searchParams,
  pathname,
  replace,
}: {
  ids: number[];
  data: Data;
  replace: (href: string, options?: NavigateOptions) => void;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  apiUrl: ApiUrl
}) => {
  try {
    await toast.promise(axios.post(`/api/${apiUrl}/delete-batch`, ids), {
      pending: "Eliminando...",
      success: {
        render() {
          return "Los datos han sido eliminados";
        },
      },
      error: "Hubo un error",
    });
    const params = new URLSearchParams(searchParams);
    params.set("deleteId", `${ids[0]}`);
    const page = searchParams.get("page") || 1;
    if (data.length == ids.length && page == 1) {
      params.delete("page");
    } else if (data.length == ids.length) {
      params.set("page", `${Number(page) - 1}`);
    }
    replace(pathname + "?" + params.toString());
  } catch (error) {
    console.log(error);
  }
};

export default toastDelete;
