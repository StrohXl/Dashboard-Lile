"use client";
import getDataById from "@/services/get/byId/getDataById";
import { useState } from "react";
import {
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FaEllipsis } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdCalculate } from "react-icons/md";

import { HistoryPrice } from "@/models/api/history_price/historyPrice.model";

import Menu from "@/components/dashboard/menu/menu";
import { OptionList } from "@/components/dashboard/menu/models/optionList.model";

import { useContextBuy } from "../hooks/useContenxtBuy";
import { FormBuy } from "../models";


export default function MenuOptions({
  remove,
  index,
  id,
  setValue,
  getValues,
}: {
  index: number;
  remove: UseFieldArrayRemove;
  id: number;
  getValues: UseFormGetValues<FormBuy>;
  setValue: UseFormSetValue<FormBuy>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    setHistoryPrice,
    setLoading,
    setShowHistory,
    setOpenModal,
    setIndexFields,
  } = useContextBuy();

  const options: OptionList[] = [
    { iconStart: MdCalculate, title: "Calcular Precio" },
    {
      iconStart: FaEye,
      title: "Historial de Precio",
    },
    {
      iconStart: MdDelete,
      title: "Remover Producto",
    },
  ];

  const optionsNew: OptionList[] = [
    { iconStart: MdCalculate, title: "Calcular Precio" },
    {
      iconStart: MdDelete,
      title: "Remover Producto",
    },
  ];

  // Functions

  const getHistoryById = async () => {
    setShowHistory(true);
    try {
      setLoading(true);
      const history = await getDataById<HistoryPrice[]>({
        apiUrl: "/history_price",
        id,
      });
      setHistoryPrice(history.data ? history.data : []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setHistoryPrice([]);
      setLoading(false);
    }
  };

  const openModal = () => {
    const unit = getValues(`products.${index}.unit`);
    const purchase_price = getValues(`products.${index}.purchase_price`);
    if (unit == "kg") {
      setValue("method", "kg");
    } else {
      setValue("method", "unit");
    }
    setValue("markup", 0.2);
    setValue("selling_price", 0);
    setValue("purchase_price", purchase_price);
    setOpenModal(true);
    setIndexFields(index);
  };

  const onClickItem = (title: string) => {
    if (title == "Calcular Precio") {
      openModal();
    } else if (title === "Remover Producto") {
      remove(index);
    } else if (title == "Historial de Precio") {
      getHistoryById();
    }
  };

  return (
    <Menu
      optionList={id == 0 ? optionsNew : options}
      open={open}
      close={setOpen}
      onClickItem={onClickItem}
    >
      <button
        className="transition-colors cursor-pointer duration-300 hover:text-primary hover:border-primary text-gray-500 rounded-[5px]"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaEllipsis size={22} />
      </button>
    </Menu>
  );
}
