import { CreatePayment } from "@/models/api/payment/createPayment.model";

export interface CreatePaymentOfSale extends CreatePayment {
  id: number;
}