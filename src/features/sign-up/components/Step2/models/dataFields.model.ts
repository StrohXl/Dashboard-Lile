import { FieldError } from "react-hook-form";

export interface DataFields {
  name: "token_1" | "token_2" | "token_3" | "token_4" | "token_5" | "token_6";
  position: number;
  error: FieldError | undefined;
}
