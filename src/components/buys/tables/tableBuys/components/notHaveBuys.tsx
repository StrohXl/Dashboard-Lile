import { HiArchiveBoxXMark } from "react-icons/hi2";
export default function NotHaveBuys() {
  return (
    <div className="pb-3 h-80 flex flex-col justify-center items-center">
      <HiArchiveBoxXMark size={200} className="text-gray-500" />
      <h4 className="font-open_sans text-lg  text-gray-700">
        No tienes productos actualmente
      </h4>
    </div>
  );
}
