import TypeParams from "@/types/typeParams";
import axios from "axios";
import { toast } from "react-toastify";

const getProducts = async (params?: TypeParams) => {
  try {
    const { data } = await axios.get("/api/products", {
      params,
    });
    return data && data;
  } catch (error) {
    console.log(error);
    toast.error('Error: no se pudieron encontrar productos')
    return { products: [], pages: 0 };
  }
};

export default getProducts;
