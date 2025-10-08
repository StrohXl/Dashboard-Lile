import { Client } from "@/models/api/client/client.model";
import getData from "@/fetch/data/getData";

import UrlParams from "@/models/url-params.model";

export interface OptionClients extends Client {
  label: string;
}

export async function getClients({
  params,
}: {
  params: UrlParams;
}): Promise<OptionClients[]> {
  const { data: clients }: { data: Client[] } = await getData({
    url: "/clients",
    params,
  });

  const optionClients: OptionClients[] = clients.map((item) => ({
    ...item,
    label: `${item.name} ${item.last_name}`,
  }));
  return optionClients;
}
