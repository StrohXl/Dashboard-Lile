import toastCreateProduct from "@/components/Toast/products/toastCreate";
import toastEditProduct from "@/components/Toast/products/toastEdit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ParamValue } from "next/dist/server/request/params";
import { UseFormReset } from "react-hook-form";
import { Product } from "@/app/api/products/models";
import { FormProduct } from "./models/form-product.model";

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
  reset: UseFormReset<FormProduct>;
}) => {
  reset({ name: "", price: 0, stock: 0 });
  router.push(link);
};