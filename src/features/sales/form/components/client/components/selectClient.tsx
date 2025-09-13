import { UseFormSetValue } from "react-hook-form";
import { useContextSale } from "../../../hooks/saleHookContext";
import { FormSale } from "../../../models";
import { useState } from "react";
import { Client } from "@/app/api/clients/models/client.model";
import getData from "@/fetch/data/getData";
import { ResponseData } from "@/models";

let time: ReturnType<typeof setTimeout> = setTimeout(() => {});

export default function SelectClient({
  setValue,
}: {
  setValue: UseFormSetValue<FormSale>;
}) {
  const { open, search, setOpen, setSearch, setLoading, loading } =
    useContextSale();

  const [clients, setClients] = useState<Client[]>([]);

  const searchClient = async (value: string) => {
    if (value == "") {
      setOpen(false);
      setSearch(value);
    } else {
      setOpen(true);
      setSearch(value);
      clearTimeout(time);
      setLoading(true);
      time = setTimeout(async () => {
        const { data }: ResponseData<Client> = await getData({
          url: "/clients",
          params: { ci: value },
        });
        setClients(data);
        setLoading(false);
      }, 200);
    }
  };

  const addClient = () => {
    setValue("client.name", clients[0].name);
    setValue("client.id", clients[0].id);
    setValue("client.last_name", clients[0].last_name);
    setValue("client.ci", `${clients[0].ci}`);
    setSearch("");
    setOpen(false);
    setClients([]);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto] relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={search}
          type="text"
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 sm:max-w-[160px] md:max-w-full md:w-[400px]"
          placeholder="Buscar Cliente"
          onChange={(event) => searchClient(event.target.value)}
        />
      </div>
      <ul
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className={`flex left-0 mt-3 top-full w-full py-2 z-30 flex-col  rounded-md bg-white absolute h-fit max-h-[150px] overflow-auto  ${
          !open && "hidden"
        }`}
      >
        {loading ? (
          <li className="px-4">Buscando...</li>
        ) : clients.length == 0 ? (
          <li className="!px-4 font-roboto">No se encontro ningun cliente</li>
        ) : (
          clients.map((item) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={addClient}
              key={item.id}
            >
              <p className="truncate"> {`${item.name} ${item.last_name}`}</p>
            </li>
          ))
        )}
      </ul>
      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !open && "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>
    </div>
  );
}
