import { toast } from "react-toastify";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Data } from "@/models";

const toastDeleteById = async ({
  id,
  apiUrl,
  searchParams,
  data,
  pathname,
  replace,
}: {
  id: number;
  data: Data;
  replace: (href: string, options?: NavigateOptions) => void;
  pathname: string;
  apiUrl: string;
  searchParams: ReadonlyURLSearchParams;
}) => {
  try {
    await toast.promise(axios.delete(`/api${apiUrl}/${id}`), {
      pending: "Eliminando...",
      success: {
        render() {
          return "Eliminado";
        },
      },
      error: "Hubo un error",
    });

    const params = new URLSearchParams(searchParams);
    params.set("deleteId", `${id}`);
    const page = searchParams.get("page") || 1;
    if (data.length < 2 && page == 1) {
      params.delete("page");
    } else if (data.length < 2 && page && Number(page) > 1) {
      params.set("page", `${Number(page) - 1}`);
    }
    replace(pathname + "?" + params.toString());
  } catch (error) {
    console.log(error);
  }
};

export default toastDeleteById;
