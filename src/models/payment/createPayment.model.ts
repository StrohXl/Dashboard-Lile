import { createPaymentSchema } from "@/app/api/payments/validators/createPayment.validator";
import z from "zod";

export type CreatePayment = z.infer<typeof createPaymentSchema>;
