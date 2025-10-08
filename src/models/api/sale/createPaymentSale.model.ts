import { CreatePayment } from "@/models/api/payment/createPayment.model";

export interface CreatePaymentOfSale extends Omit<CreatePayment, "sales_id"> {
  id: number;
}
