import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export default function NotHaveBuys() {
  return (
    <div className="pb-3 h-80 flex flex-col justify-center items-center">
      <MdOutlineRemoveShoppingCart size={200} className="text-gray-500" />
      <h4 className="font-open_sans mt-3 text-lg  text-gray-700">
        No tienes compras actualmente
      </h4>
    </div>
  );
}
