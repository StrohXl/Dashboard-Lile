import { Client } from "@/models/api/client/client.model";
import { UseFormSetValue } from "react-hook-form";


import { FormSale } from "../../../models";

export function addClient({
  client,
  setOpen,
  setTextSearch,
  setValue,
}: {
  client: Client;
  setValue: UseFormSetValue<FormSale>;
  setTextSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
}) {
  setValue("client.name", client.name);
  setValue("client.id", client.id);
  setValue("client.last_name", client.last_name);
  setValue("client.ci", `${client.ci}`);
  setTextSearch("");
  setOpen(false);
}
