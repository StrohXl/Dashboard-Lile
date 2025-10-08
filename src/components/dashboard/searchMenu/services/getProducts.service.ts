import axios from "axios";

import { Product } from "@/models/api/product";
import UrlParams from "@/models/url-params.model";
import getAllData from "@/services/get/all/getAllData";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export interface OptionProducts extends Product {
  label: string;
}

export async function getProducts({
  params,
}: {
  params: UrlParams;
}): Promise<OptionProducts[]> {
  if (params.id) {
    try {
      const { data: product }: { data: Product } = await axios.get(
        `/api/products/${params.id}`
      );
      const optionProducts: OptionProducts[] = [
        {
          ...product,
          label: product.name,
        },
      ];
      return optionProducts;
    } catch {
      return [];
    }
  } else {
    const data: ResponseData<ResponseGet<Product>> = await getAllData({
      apiUrl: "/products",
      params,
    });

    const optionProducts: OptionProducts[] = data.data
      ? data.data.data.map((item) => ({
          ...item,
          label: `${item.name}`,
        }))
      : [];
    return optionProducts;
  }
}
