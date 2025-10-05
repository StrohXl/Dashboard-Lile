import { CreatePayment } from "../validators/createPayment.validator";

export interface Payment extends CreatePayment {
  id: number;
  created_at: string;
}
