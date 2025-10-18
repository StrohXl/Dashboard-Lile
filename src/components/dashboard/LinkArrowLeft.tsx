import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export default function LinkArrowLeft({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="flex rounded-full text-gray-700 items-center justify-center border-2  hover:text-primary hover:border-primary  dark:text-white dark:border-white  transition-colors  border-gray-700 w-10 h-10"
    >
      <FaChevronLeft size={20} />
    </Link>
  );
}
