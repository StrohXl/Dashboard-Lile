import { ApiUrl, ResponseData } from "@/models";

import DeleteSelects from "./deleteSelects";
import Pagination from "./pagination";

export default function TableFooter({
  data,
  apiUrl,
}: {
  data: ResponseData;
  apiUrl: ApiUrl
}) {
  return (
    <div className="mt-6 min-h-[43px] ms-auto grid grid-cols-3 items-center justify-between pe-5">
      <div>
        <DeleteSelects apiUrl={apiUrl} data={data.data} />
      </div>
      <div className="flex justify-center">
        <Pagination data={data} />
      </div>
      <div></div>
    </div>
  );
}
