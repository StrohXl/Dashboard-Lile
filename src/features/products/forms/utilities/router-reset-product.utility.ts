import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
import { FormProduct } from "../models/form-product.model";

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
