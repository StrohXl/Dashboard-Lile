import {
  getClients,
  OptionClients,
} from "@/components/dashboard/searchMenu/services/getClients.service";
import UrlParams from "@/models/url-params.model";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export function searchClients({
  text,
  setLoading,
  setOptions,
  setTextSearch,
  setOpen,
  params,
}: {
  text: string;
  setLoading: (value: boolean) => void;
  setOptions: (value: OptionClients[]) => void;
  setTextSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  params: UrlParams;
}) {
  setOpen(true);
  setTextSearch(text);
  if (text == "") {
    setOpen(false);
  } else {
    setLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const clients = await getClients({ params });
      setLoading(false);
      setOptions(clients);
    }, 300);
  }
}
