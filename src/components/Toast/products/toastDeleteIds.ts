import { toast } from "react-toastify";
import axios from "axios";
import TypeParams from "@/components/dashboard/products/tables/tableProducts/types/typeParams";

interface ResponseAxios {
  data: {
    status: number;
    response: { data: { error: string } };
    message: string;
  };
}
const toastDeleteIds = async ({
  ids,
  setSelects,
  fetchProducts,
}: {
  ids: number[];
  setSelects: (value: number[]) => void;
  fetchProducts: (params?: TypeParams) => void;
}) => {
  try {
    await toast.promise(
      axios.post(`http://localhost:3000/api/products/delete-batch`, ids),
      {
        pending: "Eliminando Productos",
        success: {
          render() {
            return "Productos Eliminado";
          },
        },
        error: {
          render({ data }: ResponseAxios) {
            if (data.response.data.error) {
              return data.response.data.error;
            } else {
              return data.message;
            }
          },
        },
      }
    );
    fetchProducts();
    const input = document.getElementsByTagName("input")[1];
    if (input) {
      input.click();
    }
    setSelects([]);
  } catch (error) {
    console.log(error);
  }
};

export default toastDeleteIds;
