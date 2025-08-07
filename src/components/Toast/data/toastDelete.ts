import { toast } from "react-toastify";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";
import { TypeData } from "@/types/data";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const toastDelete = async ({
  ids,
  apiUrl,
  data,
  searchParams,
  pathname,
  replace,
}: {
  apiUrl: "/buys" | "/products";
  ids: number[];
  data: TypeData;
  replace: (href: string, options?: NavigateOptions) => void;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
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
    if (data.data.length == ids.length && page == 1) {
      params.delete("page");
    } else if (data.data.length == ids.length) {
      params.set("page", `${Number(page) - 1}`);
    }
    replace(pathname + "?" + params.toString());
  } catch (error) {
    console.log(error);
  }
};

export default toastDelete;
