import axios from "axios";

import { ApiUrl } from "@/models";
import UrlParams from "@/models/url-params.model";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export default async function getAllData<T>({
  apiUrl,
  params,
}: {
  apiUrl: ApiUrl;
  params: UrlParams;
}): Promise<
  Omit<ResponseData<ResponseGet<T>>, "data"> & { data?: ResponseGet<T> }
> {
  try {
    const { data }: { data: ResponseData<ResponseGet<T>> } = await axios.get(
      `/api${apiUrl}`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: "message",
      status: 400,
    };
  }
}
