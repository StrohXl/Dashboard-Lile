import { toast } from "react-toastify";
import axios from "axios";
import TypeParams from "@/types/typeParams";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: string };
    message: string;
  };
}
const toastDelete = async (
  id: number,
  fetchProducts: (params?: TypeParams) => void,
  newPage: number
) => {
  try {
    await toast.promise(
      axios.delete(`/api/products/${id}`),
      {
        pending: "Eliminando Producto",
        success: {
          render() {
            return "Producto Eliminado";
          },
        },
        error: {
          render({ data }: ResponseAxios) {
            if (data.response.data) {
              return data.response.data;
            } else {
              return data.message;
            }
          },
        },
      }
    );
    fetchProducts({ page: newPage });
  } catch (error) {
    console.log(error);
  }
};

export default toastDelete;
