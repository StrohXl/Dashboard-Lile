export default function HeaderListBody() {
  return (
    <div
      className={`grid  sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4
                                 `}
    >
      <h6 className="font-roboto text-gray-600 dark:text-white font-semibold">
        Metodo
      </h6>
      <h6 className="font-roboto text-gray-600 dark:text-white font-semibold">
        Monto
      </h6>
      <h6 className="font-roboto text-gray-600 dark:text-white font-semibold">
        Operacion
      </h6>
      <h6 className="font-roboto text-gray-600 dark:text-white font-semibold text-center">
        Acciones
      </h6>
    </div>
  );
}
