import { toast } from "react-toastify";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CreateProduct } from "@/app/api/products/validators/product.validator";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
const toastCreateProduct = async ({
  body,
  changeDisabled,
  router,
}: {
  body: CreateProduct;
  changeDisabled: () => void;
  router: AppRouterInstance;
}) => {
  try {
    await toast.promise(axios.post("/api/products", body), {
      pending: "Creando Producto",
      success: "Producto Creado",
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

export default toastCreateProduct;
