import axios from "axios";

import { ApiUrl } from "@/models";
import { ResponseGetById } from "@/models/response/get/responseGetById.model";
import { Response } from "@/models/response/response.model";
import { ResponseData } from "@/models/response/responseData.model";

export default async function getDataById<T>({
  apiUrl,
  id,
}: {
  apiUrl: ApiUrl;
  id: number;
}): Promise<
  Omit<ResponseData<ResponseGetById<T>>, "data"> & { data?: ResponseGetById<T> }
> {
  try {
    const { data }: { data: Response<ResponseGetById<T>> } = await axios.get(
      `/api${apiUrl}/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: "error",
      status: 400,
    };
  }
}
