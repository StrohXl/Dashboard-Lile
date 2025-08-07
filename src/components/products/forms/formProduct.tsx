"use client";
import { useForm } from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";
import HooksForm from "./hooks";
import onSubmit from "./utils/onSubmit";
import InputFormProduct from "./components/inputFormProduct";
import { LuDollarSign } from "react-icons/lu";
import { use, useEffect } from "react";
import getProductId from "@/fetchs/products/getProductId";
import SkeletonFormProduct from "./components/skeletonFormProduct";

export type TypeProductPriceBs = TypeProduct & {
  priceBs: number;
};

export default function FormProduct({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  // Resolver promesa de la api pyDollar
  const dollar = use(pyDollar);

  //React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TypeProductPriceBs>();

  // Variables de estado
  const {
    disabled,
    id,
    loading,
    setLoading,
    product,
    setProduct,
    router,
    setDisabled,
  } = HooksForm();

  // Obtener el producto mediante el id de la pagina
  const getProduct = async () => {
    const data = await getProductId(Number(id));
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        stock: data.stock,
        priceBs: dollar && data.price * dollar,
      });
      setProduct(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // ejecutar funcion si existe el id en la pagina
    if (id) {
      getProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  // Ver cambios en el input Price
  const fieldPrice = watch("price");

  useEffect(() => {
    // Cambiar el input priceBs cada vez que cambie el valor en el input Price
    if (dollar) {
      setValue("priceBs", fieldPrice * dollar);
    }
  }, [fieldPrice]);

  return (
    <>
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          className="flex flex-col gap-4 max-w-[450px] mt-12 !px-5 container-table"
          onSubmit={handleSubmit((body) =>
            onSubmit({ body, data: product, id, reset, router, setDisabled })
          )}
        >
          <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
            Producto
          </h4>

          <InputFormProduct
            error={errors.name}
            label="Nombre del Producto"
            nameField="name"
            register={register}
            options={{
              required: "Este campo es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe de tener minimo 3 caracteres",
              },
            }}
          />
          <InputFormProduct
            error={errors.stock}
            label="Cantidad"
            nameField="stock"
            defaultValue={0}
            register={register}
            placeholder="1"
            type="number"
            options={{
              required: "Este campo es requerido",
              min: {
                value: 1,
                message: "La cantidad debe de ser  minimo 1",
              },
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputFormProduct
              error={errors.price}
              label="Precio en $"
              nameField="price"
              register={register}
              placeholder="1"
              step="any"
              type="number"
              defaultValue={0}
              options={{
                required: "Este campo es requerido",
                min: {
                  value: 0.1,
                  message: "La cantidad debe de ser  minimo 0.1",
                },
              }}
              iconEnd={<LuDollarSign />}
            />
            <InputFormProduct
              error={errors.priceBs}
              label="Precio en Bs"
              nameField="priceBs"
              register={register}
              defaultValue={0}
              placeholder="1"
              disabled={true}
              type="number"
              iconEnd={<span>Bs</span>}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="btn-primary mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            {product ? "Guardar cambios" : "Agregar"}
          </button>
        </form>
      )}
    </>
  );
}
