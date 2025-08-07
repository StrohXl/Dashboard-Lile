import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
import { TypeProductPriceBs } from "../formProduct";

export default function routerResetProducts({
  link,
  router,
  reset,
}: {
  link: string;
  router: AppRouterInstance;
  reset: UseFormReset<TypeProductPriceBs>;
}) {
  reset({ name: "", price: 0, stock: 0 });
  router.push(link);
}
