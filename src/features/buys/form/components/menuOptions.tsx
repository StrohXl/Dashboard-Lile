"use client";
import { FaEllipsis } from "react-icons/fa6";
import { useState } from "react";
import {
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { MdDelete } from "react-icons/md";
import Menu from "@/components/dashboard/menu/menu";
import { OptionList } from "@/components/dashboard/menu/models/optionList.model";
import { FaEye } from "react-icons/fa6";
import { FormBuy } from "../models";
import { MdCalculate } from "react-icons/md";
import { useContextBuy } from "../hooks/useContenxtBuy";
import axios from "axios";
import { HistoryPrice } from "@/app/api/history_price/models/historyPrice.model";
import { ResponseData } from "@/models";

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
      const { data }: { data: ResponseData<HistoryPrice> } = await axios.get(
        `/api/history_price/${id}`
      );
      setHistoryPrice(data.data);
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
