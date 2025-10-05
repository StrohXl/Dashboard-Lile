import { useState } from "react";

type Data<T>  = T[]

export default function SearchMenuHooks<T>() {
  const [loading, setLoading] = useState<boolean>(true);
  const [textSearch, setTextSearch] = useState<string | number>("");
  const [options, setOptions] = useState<Data<T>>([]);
  const [open, setOpen] = useState<boolean>(false);

  return {
    open,
    setOpen,
    textSearch,
    setTextSearch,
    loading,
    setLoading,
    options,
    setOptions,
  };
}
