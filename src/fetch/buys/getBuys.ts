import axios from "axios";
import { toast } from "react-toastify";


import UrlParams from "@/models/url-params.model";

const getBuys = async (params?: UrlParams) => {
  try {
    const { data } = await axios.get("/api/buys", {
      params,
    });
    return data && data;
  } catch (error) {
    console.log(error);
    toast.error('Error: no se encontro una lista de compras');
    return { buys: [], pages: 0 };
  }
};

export default getBuys;
