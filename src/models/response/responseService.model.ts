import { NextResponse } from "next/server";
import { Response } from "./response.model";

export type ResponseService<T> = Promise<
  | NextResponse<
      Omit<Response<T>, "data"> & {
        data?: T;
      }
    >
  | undefined
>;
