import TypeParams from "@/components/dashboard/products/tables/tableProducts/types/typeParams";
import axios from "axios";

const getProducts = async (params?: TypeParams) => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params,
    });
    return data && data;
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
