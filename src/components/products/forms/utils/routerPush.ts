import TypeProduct from "@/app/api/products/type/typeProducts";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";

export default function routerResetProducts({
  link,
  router,
  reset,
}: {
  link: string;
  router: AppRouterInstance;
  reset: UseFormReset<TypeProduct>;
}) {
  reset({ name: "", description: "", price: 0, stock: 0 });
  router.push(link);
}
