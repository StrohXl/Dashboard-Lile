import { FaUser } from "react-icons/fa6";

export default function AvatarLoading() {
  return (
    <div className="uppercase animate-pulse flex justify-center items-center size-10 rounded-full shadow-sm dark:bg-gray-700 text-gray-700 bg-white dark:text-white">
      <FaUser />
    </div>
  );
}
