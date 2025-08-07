import TypeProduct from "@/app/api/products/type/typeProducts";
import toastCreateProduct from "@/components/Toast/products/toastCreate";
import toastEditProduct from "@/components/Toast/products/toastEdit";
import { UseFormReset } from "react-hook-form";
import routerResetProducts from "./routerPush";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ParamValue } from "next/dist/server/request/params";
import { TypeProductPriceBs } from "../formProduct";

const onSubmit = async ({
  body,
  data,
  reset,
  setDisabled,
  router,
  id,
}: {
  id: ParamValue;
  reset: UseFormReset<TypeProductPriceBs>;
  body: TypeProductPriceBs;
  data: TypeProduct | undefined;
  setDisabled: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  body.name = body.name.toLocaleLowerCase()
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
export default onSubmit;
