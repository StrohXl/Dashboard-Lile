import { CreatePayment } from "./createPayment.model";

export interface Payment extends CreatePayment {
  id: number;
  created_at: string;
}
