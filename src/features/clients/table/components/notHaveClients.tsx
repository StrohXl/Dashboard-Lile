import { HiUsers } from "react-icons/hi";

export default function NotHaveClients() {
  return (
    <div className="pb-3 h-80 flex flex-col justify-center items-center">
      <HiUsers size={200} className="text-gray-500" />
      <h4 className="font-open_sans mt-3 text-lg  text-gray-700">
        No tienes clientes actualmente
      </h4>
    </div>
  );
}
