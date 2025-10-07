"use client";

import { use } from "react";
import { IoClose } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import Modal from "react-responsive-modal";

import SkeletonHistory from "@/components/dashboard/skeleton/skeletonHistory";
import NotHave from "@/components/dashboard/tables/components/notHave";

import { useContextBuy } from "@/features/buys/form/hooks/useContenxtBuy";

import TableBodyHistoryPrice from "../../../history_price/table/components/tableBodyHistoryPrice";
const ContainerHistoryPrice = ({
  dollarPy,
}: {
  dollarPy: Promise<number | undefined>;
}) => {
  const { loading, historyPrice, showHistory, setShowHistory } =
    useContextBuy();
  const dollar = use(dollarPy) ?? 0;

  if (showHistory) {
    return (
      <>
        <section className="container-table max-w-[1200px] hidden 2xl:flex h-fit  flex-col overflow-hidden relative">
          <div className="flex justify-between items-centerF mb-6 ">
            <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
              Historial de Precios
            </h4>
            <div className="flex items-center gap-6">
              <button
                className="transition-colors hover:text-primary cursor-pointer  duration-300 text-gray-400"
                type="button"
                onClick={() => setShowHistory(false)}
              >
                <IoClose size={25} />
              </button>
            </div>
          </div>
          {loading ? (
            <SkeletonHistory />
          ) : historyPrice.length == 0 ? (
            <NotHave
              size={100}
              height={200}
              message="No se encontro un historial"
              icon={MdHistory}
            />
          ) : (
            <TableBodyHistoryPrice data={historyPrice} dollarPy={dollar} />
          )}
        </section>
        <Modal
          styles={{ modal: { borderRadius: "8px" } }}
          center
          open={showHistory}
          onClose={() => setShowHistory(false)}
        >
          <section className="container-table h-fit !p-0 !shadow-none">
            <div className="flex justify-between items-centerF mb-6 ">
              <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
                Historial de Precios
              </h4>
            </div>
            {loading ? (
              <SkeletonHistory />
            ) : historyPrice.length == 0 ? (
              <NotHave
                size={100}
                height={200}
                message="No se encontro un historial"
                icon={MdHistory}
              />
            ) : (
              <TableBodyHistoryPrice data={historyPrice} dollarPy={dollar} />
            )}
          </section>
        </Modal>
      </>
    );
  }
};

export default ContainerHistoryPrice;
