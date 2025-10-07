
import { Product } from "@/app/api/products/models";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const getProductId = async (id: number): Promise<Product | undefined> => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      toast.error(error.message);
    } else {
      console.log(error);
      toast.error("Error");
    }
  }
};
export default getProductId;
