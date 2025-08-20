import { Data } from "./data.model";

export type ResponseData<T = unknown> = {
  data: Data<T>;
  pages: number;
};
