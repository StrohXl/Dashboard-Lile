import TypeProduct from "@/app/api/products/type/typeProducts";
import toastCreateProduct from "@/components/Toast/products/toastCreate";
import toastEditProduct from "@/components/Toast/products/toastEdit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ParamValue } from "next/dist/server/request/params";
import { UseFormReset } from "react-hook-form";
import { ProductPriceBsType } from "./formProduct";
import getProductId from "@/fetchs/products/getProductId";

export const onSubmit = async ({
  body,
  data,
  reset,
  setDisabled,
  router,
  id,
}: {
  id: ParamValue;
  reset: UseFormReset<ProductPriceBsType>;
  body: ProductPriceBsType;
  data: TypeProduct | undefined;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  body.name = body.name.toLocaleLowerCase();
  setDisabled(true);
  if (data) {
    toastEditProduct({
      body,
      routerPush: (link) => routerResetProducts({ link, reset, router }),
      changeDisabled: () => setDisabled(false),
      id,
    });
  } else {
    await toastCreateProduct({
      body,
      routerPush: (link) => routerResetProducts({ link, reset, router }),
      changeDisabled: () => setDisabled(false),
    });
  }
};

export const routerResetProducts = ({
  link,
  router,
  reset,
}: {
  link: string;
  router: AppRouterInstance;
  reset: UseFormReset<ProductPriceBsType>;
}) => {
  reset({ name: "", price: 0, stock: 0 });
  router.push(link);
};

export const getProduct = async ({
  id,
  reset,
  setProduct,
  setLoading,
  dollar,
}: {
  id: number;
  dollar: number | undefined;
  reset: UseFormReset<ProductPriceBsType>;
  setProduct: (value: TypeProduct | undefined) => void;
  setLoading: (value: boolean) => void;
}) => {
  const data = await getProductId(id);
  if (data) {
    reset({
      name: data.name,
      price: data.price,
      stock: data.stock,
      priceBs: dollar && data.price * dollar,
    });
    setProduct(data);
  }
  setLoading(false);
};
