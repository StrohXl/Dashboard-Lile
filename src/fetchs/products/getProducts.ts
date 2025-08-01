import TypeParams from "@/components/products/tables/tableProducts/types/typeParams";
import axios from "axios";
import { toast } from "react-toastify";

const getProducts = async (params?: TypeParams) => {
  const token = localStorage.getItem("myTokenLile");
  try {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params,
      headers: {
        "xm-lile-token": token,
      },
    });
    return data && data;
  } catch (error) {
    console.log(error);
    toast.error('Error: no se pudieron encontrar productos')
    return { products: [], pages: 0 };
  }
};

export default getProducts;
