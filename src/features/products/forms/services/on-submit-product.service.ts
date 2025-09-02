import toastCreateProduct from "@/components/Toast/products/toastCreate";
import toastEditProduct from "@/components/Toast/products/toastEdit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ParamValue } from "next/dist/server/request/params";
import { FormProduct } from "../models/form-product.model";
import { createBodyProduct, editBodyProductAdapter } from "../adapters";

export const onSubmit = async ({
  body,
  setDisabled,
  router,
  id,
}: {
  id: ParamValue;
  body: FormProduct;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  setDisabled(true);
  if (id) {
    const editProduct = editBodyProductAdapter(body);
    await toastEditProduct({
      body: editProduct,
      changeDisabled: () => setDisabled(false),
      id,
      router,
    });
  } else {
    const createProduct = createBodyProduct(body);
    await toastCreateProduct({
      body: createProduct,
      changeDisabled: () => setDisabled(false),
      router,
    });
  }
};
