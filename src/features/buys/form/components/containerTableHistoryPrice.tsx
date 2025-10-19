"use client";

import { use } from "react";
import { IoClose } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import Modal from "react-responsive-modal";

import SkeletonHistory from "@/components/dashboard/skeleton/skeletonHistory";
import NotHave from "@/components/dashboard/tables/components/notHave";

import { useContextBuy } from "@/features/buys/form/hooks/useContenxtBuy";

import TableBodyHistoryPrice from "../../../history_price/table/components/tableBodyHistoryPrice";
import { useContextLayout } from "@/components/dashboard/hooks/ContextLayout";

const ContainerHistoryPrice = ({
  dollarPy,
}: {
  dollarPy: Promise<number | undefined>;
}) => {
  const { loading, historyPrice, showHistory, setShowHistory } =
    useContextBuy();
  const { theme } = useContextLayout();
  const dollar = use(dollarPy) ?? 0;

  return (
    <Modal
      styles={{
        modal: {
          borderRadius: "10px",
          padding: 0,
        },
      }}
      center
      open={showHistory}
      onClose={() => setShowHistory(false)}
      closeIcon={
        <IoClose
          data-theme={theme}
          className="text-gray-800 dark:text-white transition-colors hover:text-primary"
          size={25}
        />
      }
      data-theme={theme}
    >
      <div
        data-theme={theme}
        className="p-[1.2rem] bg-white md:min-w-[400px] container-shadow !shadow-none dark:bg-gray-800 overflow-hidden rounded-lg"
      >
        <div className="flex justify-between items-centerF mb-6 ">
          <h4 className="font-open_sans text-2xl font-semibold text-gray-800 dark:text-white">
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
      </div>
    </Modal>
  );
};

export default ContainerHistoryPrice;
