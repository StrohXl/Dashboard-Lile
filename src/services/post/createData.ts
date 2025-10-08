import axios from "axios";

import { ApiUrl } from "@/models";
import { ResponseData } from "@/models/response/responseData.model";

export default async function createData<CreateData, Data>({
  apiUrl,
  body,
}: {
  apiUrl: ApiUrl;
  body: CreateData;
}): Promise<Omit<ResponseData<Data>, "data"> & { data?: Data }> {
  try {
    const { data }: { data: ResponseData<Data> } = await axios.post(
      `/api${apiUrl}`,
      body
    );
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error", status: 400 };
  }
}
