import { toast } from "react-toastify";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import TypeProduct from "@/app/api/products/type/typeProducts";
interface ResponseAxios {
  data: {
    status: number;
    response: { data: { error: string } };
    message: string;
  };
}
const toastEditProduct = async ({
  body,
  routerPush,
  changeDisabled,
  id,
}: {
  body: TypeProduct;
  routerPush: (ruta: string) => void;
  changeDisabled: () => void;
  id: ParamValue;
}) => {
  try {
    await toast.promise(axios.put(`/api/products/${id}`, body), {
      pending: "Editando Producto",
      success: "Producto Editado",
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
    console.log(error);
    changeDisabled();
  }
};

export default toastEditProduct;
