export interface ParamsRequest {
  name?: string;
  all?: "true" | "false" | string;
  page?: number;
  ci?: number | null;
}
