import TypeParams from "@/types/typeParams";
import axios from "axios";
import { toast } from "react-toastify";

const getData = async (url: string, params?: TypeParams) => {
  try {
    const { data } = await axios.get(`/api${url}`, {
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Error");
    return { data: [], pages: 0 };
  }
};

export default getData;
