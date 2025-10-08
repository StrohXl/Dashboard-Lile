import getData from "@/fetch/data/getData";
import axios from "axios";

import { Product } from "@/models/api/product";
import UrlParams from "@/models/url-params.model";

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
    const { data: products }: { data: Product[] } = await getData({
      url: "/products",
      params,
    });

    const optionProducts: OptionProducts[] = products.map((item) => ({
      ...item,
      label: `${item.name}`,
    }));
    return optionProducts;
  }
}
