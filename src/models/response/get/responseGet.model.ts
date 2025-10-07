import { Data } from "@/models/data.model";

export interface ResponseGet<T> {
  data: Data<T>;
  pages: number;
}
