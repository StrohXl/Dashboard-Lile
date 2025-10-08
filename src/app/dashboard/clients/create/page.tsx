import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

import FormClient from "@/features/clients/form/formClient";

export default function CreateClient() {
  return (
    <div>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 font-open_sans">
          Agregar cliente
        </h2>
        <Link
          href={"/dashboard/clients"}
          className="flex rounded-full text-gray-700 items-center justify-center border-2 hover:text-primary hover:border-primary transition-colors  duration-300 border-gray-700 w-[30px] h-[30px]"
        >
          <FaChevronLeft size={13} />
        </Link>
      </div>
      <section>
        <FormClient />
      </section>
    </div>
  );
}
