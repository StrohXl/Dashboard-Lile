import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export default function NotHaveProducts() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <MdOutlineRemoveShoppingCart size={80} className="text-gray-500" />
        <h4 className="font-open_sans mt-3 text-md  text-gray-700">
          Agregue un producto
        </h4>
      </div>
    </>
  );
}
