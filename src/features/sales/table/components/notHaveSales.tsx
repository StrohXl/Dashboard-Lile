import { FaCashRegister } from "react-icons/fa6";

export default function NotHaveSales() {
  return (
    <div className="pb-3 h-80 flex flex-col justify-center items-center">
      <FaCashRegister size={200} className="text-gray-500" />
      <h4 className="font-open_sans mt-3 text-lg  text-gray-700">
        No tienes ventas actualmente
      </h4>
    </div>
  );
}
