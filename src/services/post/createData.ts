import { getUrl } from "@/utils/getUrl";
import axios, { AxiosError } from "axios";

import { ApiUrl } from "@/models";
import { ResponseData } from "@/models/response/responseData.model";

export default async function createData<CreateData, Data>({
  apiUrl,
  body,
}: {
  apiUrl: ApiUrl;
  body: CreateData;
}): Promise<Omit<ResponseData<Data>, "data"> & { data?: Data }> {
  const siteUrl = await getUrl();
  try {
    const { data }: { data: ResponseData<Data> } = await axios.post(
      `${siteUrl}/api${apiUrl}`,
      body
    );
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
}
