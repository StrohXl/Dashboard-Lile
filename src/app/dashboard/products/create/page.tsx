import FormProduct from "@/components/dashboard/products/forms/formProduct";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
export default async function CreateProducts() {
  return (
    <>
      <div className="flex mb-6 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-700 font-open_sans">
          Agregar Producto
        </h2>
        <Link
          href={"/dashboard/products"}
          className="flex rounded-full text-primary items-center justify-center border-2 hover:text-primary-ligth hover:border-primary-ligth  transition-colors  duration-300 border-primary w-10 h-10"
        >
          <FaChevronLeft size={20} />
        </Link>
      </div>
      <section>
        <FormProduct />
      </section>
    </>
  );
}
