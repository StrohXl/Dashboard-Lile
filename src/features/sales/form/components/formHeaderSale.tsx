import { useContextSale } from "../hooks/saleHookContext";

export default function FormHeaderSale() {
  const { totalPrice, dollar, formSteps } = useContextSale();
  const sectionArray = [
    "Registro de Cliente",
    "Productos",
    "Transacciones y Ajustes",
    "Confirmación",
  ];
  return (
    <div className="pb-6 border-b-1 border-gray-400">
      <div className="flex  gap-6 justify-between items-center">
        <h4 className="mb-2 font-open_sans text-gray-800 dark:text-white font-semibold text-2xl">
          Total de la compra
        </h4>
        <div className="flex items-center">
          <h4 className="mb-2 font-open_sans text-gray-800 dark:text-white me-12 font-semibold text-4xl">
            {totalPrice.toFixed(2)}$
          </h4>
          <h4 className="mb-2 ps-12 border-l-1 border-gray-600 font-open_sans text-gray-800 dark:text-white font-semibold text-4xl">
            {(totalPrice * dollar).toFixed(2)}Bs
          </h4>
        </div>
      </div>

      <div className="flex mt-4 justify-between relative">
        <div className="bar absolute w-full h-[2px] bg-gray-400 top-[28%] translate-y-[-50%]"></div>
        <div
          className={`bar absolute transition-all duration-500 ${
            formSteps == 0
              ? "w-[10%]"
              : formSteps == 1
                ? "w-[35%]"
                : formSteps == 2
                  ? "w-[63%]"
                  : formSteps == 3 && "w-full"
          } h-[2px] bg-primary dark:bg-white top-[28%] translate-y-[-50%]`}
        ></div>

        {sectionArray.map((item, index) => (
          <div key={index} className="relative z-30">
            <div className="flex justify-center">
              <span
                className={`flex justify-center bg-white dark:bg-gray-800 items-center rounded-full h-[30px] w-[30px] border-2 ${
                  formSteps >= index
                    ? "border-primary text-primary dark:text-white  dark:border-white"
                    : "border-gray-400 text-gray-400"
                }`}
              >
                {index + 1}
              </span>
            </div>
            <p
              className={`font-open_sans  font-medium mt-1 ${
                formSteps >= index
                  ? "text-primary-dark dark:text-white"
                  : "text-gray-400"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
