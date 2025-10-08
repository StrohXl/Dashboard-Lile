import { Client } from "@/models/api/client/client.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseData } from "@/models/response/responseData.model";
import UrlParams from "@/models/url-params.model";
import getAllData from "@/services/get/all/getAllData";

export interface OptionClients extends Client {
  label: string;
}

export async function getClients({
  params,
}: {
  params: UrlParams;
}): Promise<OptionClients[]> {
  const data: ResponseData<ResponseGet<Client>> = await getAllData<Client>({
    apiUrl: "/clients",
    params,
  });

  const optionClients: OptionClients[] = data.data
    ? data.data.data.map((item) => ({
        ...item,
        label: `${item.name} ${item.last_name}`,
      }))
    : [];
  return optionClients;
}
