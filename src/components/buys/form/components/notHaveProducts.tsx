import { FieldErrors } from "react-hook-form";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FormBuyType } from "../types";

export default function NotHaveProducts({
  errors,
}: {
  errors: FieldErrors<FormBuyType>;
}) {
  return (
    <div>
      {errors?.products?.root?.message && (
        <div className="flex flex-col items-center justify-center">
          <MdOutlineRemoveShoppingCart size={80} className="text-gray-500" />
          <h4 className="font-open_sans mt-3 text-md  text-gray-700">
            Agregue un producto
          </h4>
        </div>
      )}
    </div>
  );
}
