import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";


import FormClient from "@/features/clients/form/formClient";
export default function ClientId() {
  
  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold font-open_sans">
          Cliente
        </h2>
        <Link
          href={"/dashboard/clients"}
          className="flex rounded-full text-primary items-center justify-center border-2 hover:text-primary-ligth hover:border-primary-ligth  transition-colors  duration-300 border-primary w-10 h-10"
        >
          <FaChevronLeft size={20} />
        </Link>
      </div>
      <section>
        <FormClient />
      </section>
    </>
  );
}
