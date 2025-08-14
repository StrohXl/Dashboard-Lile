import { toast } from "react-toastify";
import axios from "axios";
import { CreateProduct } from "@/app/api/products/models";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
const toastCreateProduct = async ({
  body,
  routerPush,
  changeDisabled,
}: {
  body: CreateProduct;
  routerPush: (ruta: string) => void;
  changeDisabled: () => void;
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
    routerPush("/dashboard/products");
  } catch (error) {
    console.log(error);
    changeDisabled();
  }
};

export default toastCreateProduct;
