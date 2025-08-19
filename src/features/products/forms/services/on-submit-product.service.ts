import toastCreateProduct from "@/components/Toast/products/toastCreate";
import toastEditProduct from "@/components/Toast/products/toastEdit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ParamValue } from "next/dist/server/request/params";
import { UseFormReset } from "react-hook-form";
import { Product } from "@/app/api/products/models";
import { routerResetProducts } from "../utilities/router-reset-product.utility";
import { FormProduct } from "../models/form-product.model";
import { createBodyProduct, editBodyProductAdapter } from "../adapters";

export const onSubmit = async ({
  body,
  data,
  reset,
  setDisabled,
  router,
  id,
}: {
  id: ParamValue;
  reset: UseFormReset<FormProduct>;
  body: FormProduct;
  data: Product | undefined;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  setDisabled(true);
  if (data) {
    const editProduct = editBodyProductAdapter(body);
    toastEditProduct({
      body: editProduct,
      routerPush: (link) => routerResetProducts({ link, reset, router }),
      changeDisabled: () => setDisabled(false),
      id,
    });
  } else {
    const createProduct = createBodyProduct(body);
    await toastCreateProduct({
      body: createProduct,
      routerPush: (link) => routerResetProducts({ link, reset, router }),
      changeDisabled: () => setDisabled(false),
    });
  }
};
