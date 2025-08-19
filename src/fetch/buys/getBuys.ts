import TypeParams from "@/models/typeParams";
import axios from "axios";
import { toast } from "react-toastify";

const getBuys = async (params?: TypeParams) => {
  try {
    const { data } = await axios.get("/api/buys", {
      params,
    });
    return data && data;
  } catch (error) {
    console.log(error);
    toast.error('Error: no se encontro una lista de compras')
    return { buys: [], pages: 0 };
  }
};

export default getBuys;
