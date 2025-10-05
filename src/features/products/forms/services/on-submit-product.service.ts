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
  iva,
}: {
  id: ParamValue;
  body: FormProduct;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
  iva: number;
}) => {
  setDisabled(true);

  if (id) {
    const editProduct = editBodyProductAdapter({ body, iva });
    await toastEditProduct({
      body: editProduct,
      changeDisabled: () => setDisabled(false),
      id,
    });
  } else {
    const createProduct = createBodyProduct({ body, iva });
    await toastCreateProduct({
      body: createProduct,
      changeDisabled: () => setDisabled(false),
      router,
    });
  }
};
