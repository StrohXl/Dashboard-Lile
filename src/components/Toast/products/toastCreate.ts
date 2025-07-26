import { toast } from "react-toastify";
import axios from "axios";
import TypeProduct from "@/app/api/products/type/typeProducts";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: { error: string } };
    message: string;
  };
}
const toastCreateProduct = async ({
  body,
  routerPush,
  changeDisabled,
}: {
  body: TypeProduct;
  routerPush: (ruta: string) => void;
  changeDisabled: () => void;
}) => {
  try {
    await toast.promise(axios.post("/api/products", body), {
      pending: "Creando Producto",
      success: "Producto Creado",
      error: {
        render({ data }: ResponseAxios) {
          if (data.response.data.error) {
            return data.response.data.error;
          } else {
            return data.response.data.error;
          }
        },
      },
    });
    routerPush("/dashboard/products");
  } catch (error) {
    console.log(error)
    changeDisabled();
  }
};

export default toastCreateProduct;
