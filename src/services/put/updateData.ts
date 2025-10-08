import axios, { AxiosError } from "axios";

import { ApiUrl } from "@/models";
import { ResponseData } from "@/models/response/responseData.model";

export async function updateData<Body, Data>({
  apiUrl,
  body,
  id,
}: {
  apiUrl: ApiUrl;
  id: number;
  body: Body;
}): Promise<ResponseData<Data>> {
  try {
    const { data }: { data: ResponseData<Data> } = await axios.put(
      `/api${apiUrl}/${id}`,
      body
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw error;
  }
}
