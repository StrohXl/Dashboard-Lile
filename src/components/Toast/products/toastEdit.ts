import { toast } from "react-toastify";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CreateProduct } from "@/app/api/products/validators/product.validator";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
const toastEditProduct = async ({
  body,
  changeDisabled,
  id,
  router,
}: {
  body: CreateProduct;
  changeDisabled: () => void;
  id: ParamValue;
  router: AppRouterInstance;
}) => {
  try {
    await toast.promise(axios.put(`/api/products/${id}`, body), {
      pending: "Editando Producto",
      success: "Producto Editado",
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
    router.push("/dashboard/products");
  } catch (error) {
    console.log(error);
    changeDisabled();
  }
};

export default toastEditProduct;
