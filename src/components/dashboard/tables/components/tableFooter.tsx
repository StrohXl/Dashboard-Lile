import { ApiUrl } from "@/models";

import DeleteSelects from "./deleteSelects";
import Pagination from "./pagination";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export default function TableFooter<T>({
  data,
  apiUrl,
}: {
  data: ResponseData<ResponseGet<T>>;
  apiUrl: ApiUrl;
}) {
  return (
    <div className="mt-6 min-h-[43px] ms-auto grid grid-cols-3 items-center justify-between pe-5">
      <div>
        <DeleteSelects apiUrl={apiUrl} data={data.data ? data.data.data : []} />
      </div>
      <div className="flex justify-center">
        <Pagination pages={data.data ? data.data.pages : 0} />
      </div>
      <div></div>
    </div>
  );
}
